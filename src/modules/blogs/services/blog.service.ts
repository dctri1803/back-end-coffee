import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogPost } from "src/database/entities/blog-post.entity";
import { Repository, DataSource } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';
import { CreateBlogDto } from "../dto/create-blog.dto";
import { BlogImage } from "src/database/entities/blog-image.entity";
import { UpdateBlogDto } from "../dto/update-blog.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private blogRepository: Repository<BlogPost>,
    private dataSource: DataSource,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { offset, limit } = paginationDto;
    return await this.blogRepository
      .createQueryBuilder('blogs')
      .leftJoinAndSelect('blogs.images', 'images')
      // .leftJoinAndSelect('blogs.comments', 'blog_comments')
      .take(limit)
      .skip(offset)
      .getManyAndCount();
  }

  // Find a single blog post by ID
  async findOne(id: number): Promise<BlogPost> {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: { images: true },
    });
    if (!blog) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return blog;
  }

  // Create a new blog post with images
  async create(
    createBlogDto: CreateBlogDto,
    files: Express.Multer.File[],
  ): Promise<BlogPost> {
    let newBlog;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      newBlog = await queryRunner.manager.save(BlogPost, 
        { ...createBlogDto });

      const subFolderDir = `blogs/${newBlog.id.toString()}`;
      const folderDir = path.join('public', subFolderDir);

      if (!fs.existsSync(folderDir)) {
        fs.mkdirSync(folderDir, { recursive: true });
      }

      const blogImages = files.map((file) => {
        const filePath = `${folderDir}/${file.originalname}`;
        fs.writeFileSync(filePath, file.buffer);
        return {
          url: `${process.env.HOST}/${subFolderDir}/${file.originalname}`,
          blog_post_id: newBlog.id,
        };
      });

      const newBlogImages = await queryRunner.manager.save(
        BlogImage, 
        blogImages
      );

      newBlog.images = newBlogImages;
      await queryRunner.commitTransaction();

      return newBlog;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // Update an existing blog post
  async update(
    id: number,
    updateBlogDto: UpdateBlogDto,
    files?: Express.Multer.File[],
  ): Promise<BlogPost> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingBlog = await queryRunner.manager.findOne(BlogPost, {
        where: { id },
        relations: ['images'],
      });

      if (!existingBlog) {
        throw new NotFoundException(`Blog post with ID ${id} not found`);
      }

      // Update blog details
      Object.assign(existingBlog, updateBlogDto);
      const updatedBlog = await queryRunner.manager.save(existingBlog);

      // Remove old images if new files are uploaded
      if (files && files.length > 0) {
        for (const image of existingBlog.images) {
          const oldFilePath = path.join('public', image.url.replace(`${process.env.HOST}/`, ''));
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }

        await queryRunner.manager.delete(BlogImage, { blog_post_id: id });

        // Save new images
        const subFolderDir = `blogs/${id.toString()}`;
        const folderDir = path.join('public', subFolderDir);

        if (!fs.existsSync(folderDir)) {
          fs.mkdirSync(folderDir, { recursive: true });
        }

        const newBlogImages = files.map((file) => {
          const filePath = `${folderDir}/${file.originalname}`;
          fs.writeFileSync(filePath, file.buffer);
          return {
            url: `${process.env.HOST}/${subFolderDir}/${file.originalname}`,
            blog_post_id: id,
          };
        });

        await queryRunner.manager.save(BlogImage, newBlogImages);
      }

      await queryRunner.commitTransaction();
      return updatedBlog;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // Delete a blog post and its images
  async delete(id: number): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const blog = await queryRunner.manager.findOne(BlogPost, {
        where: { id },
        relations: ['images'],
      });

      if (!blog) {
        throw new NotFoundException(`Blog post with ID ${id} not found`);
      }

      // Delete images from filesystem
      for (const image of blog.images) {
        const filePath = path.join('public', image.url.replace(`${process.env.HOST}/`, ''));
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      // Delete images from database
      await queryRunner.manager.delete(BlogImage, { blog_post_id: id });

      // Delete blog post
      await queryRunner.manager.delete(BlogPost, { id });

      await queryRunner.commitTransaction();
      return `Blog post with ID ${id} deleted successfully`;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
