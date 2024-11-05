import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogPost } from "src/database/entities/blog-post.entity";
import { Repository, DataSource } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';
import { CreateBlogDto } from "../dto/create-blog.dto";
import { BlogImage } from "src/database/entities/blog-image.entity";

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private blogRepository: Repository<BlogPost>,
    private dataSource: DataSource,
  ) {}

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
        blogImages);
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
}
