import { Body, Controller, Delete, Get, NotFoundException, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BlogService } from "../services/blog.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateBlogDto } from "../dto/create-blog.dto";
import { BlogPost } from "src/database/entities/blog-post.entity";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { PageDto } from "src/shared/dto/page.dto";
import { PaginationMetaDataDto } from "src/shared/dto/pagination-metadata.dto";
import { UpdateBlogDto } from "../dto/update-blog.dto";

@ApiTags('Blogs')
@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

 // Retrieve all blog posts
 @Get()
 @ApiOperation({ summary: 'Get all blog posts' })
 @ApiResponse({ status: 200, description: 'List of all blog posts', type: [BlogPost] })
 async findAll(@Query() paginationDto: PaginationDto){
   const [data, totalItem] = await this.blogService.findAll(paginationDto);

   return new PageDto(
     data,
     new PaginationMetaDataDto(totalItem, paginationDto),
 );  }

 // Retrieve a blog post by ID
 @Get(':id')
 @ApiOperation({ summary: 'Get a blog post by ID' })
 @ApiParam({ name: 'id', type: Number, description: 'ID of the blog post' })
 @ApiResponse({ status: 200, description: 'Blog post found', type: BlogPost })
 @ApiResponse({ status: 404, description: 'Blog post not found' })
 async findOne(@Param('id', ParseIntPipe) id: number): Promise<BlogPost> {
   const blog = await this.blogService.findOne(id);
   if (!blog) {
     throw new NotFoundException(`Blog post with ID ${id} not found`);
   }
   return blog;
 }

 // Create a new blog post
 @Post()
 @ApiOperation({ summary: 'Create a new blog post' })
 @ApiConsumes('multipart/form-data')
 @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
 @ApiBody({
   description: 'Data for creating a blog post',
   type: CreateBlogDto,
 })
 @ApiResponse({ status: 201, description: 'Blog post created successfully', type: BlogPost })
 async create(
   @Body() createBlogDto: CreateBlogDto,
   @UploadedFiles() files: { files?: Express.Multer.File[] },
 ): Promise<BlogPost> {
   return await this.blogService.create(createBlogDto, files.files || []);
 }

 // Update an existing blog post by ID
 @Put(':id')
 @ApiOperation({ summary: 'Update a blog post by ID' })
 @ApiParam({ name: 'id', type: Number, description: 'ID of the blog post to update' })
 @ApiConsumes('multipart/form-data')
 @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
 @ApiBody({
   description: 'Data for updating a blog post',
   type: UpdateBlogDto,
 })
 @ApiResponse({ status: 200, description: 'Blog post updated successfully', type: BlogPost })
 @ApiResponse({ status: 404, description: 'Blog post not found' })
 async update(
   @Param('id', ParseIntPipe) id: number,
   @Body() updateBlogDto: UpdateBlogDto,
   @UploadedFiles() files: { files?: Express.Multer.File[] },
 ): Promise<BlogPost> {
   return await this.blogService.update(id, updateBlogDto, files.files || []);
 }

 // Delete a blog post by ID
 @Delete(':id')
 @ApiOperation({ summary: 'Delete a blog post by ID' })
 @ApiParam({ name: 'id', type: Number, description: 'ID of the blog post to delete' })
 @ApiResponse({ status: 200, description: 'Blog post deleted successfully' })
 @ApiResponse({ status: 404, description: 'Blog post not found' })
 async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
   return await this.blogService.delete(id);
 }
}
