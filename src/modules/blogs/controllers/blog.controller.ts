import { Body, Controller, ParseFilePipeBuilder, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { BlogService } from "../services/blog.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CreateBlogDto } from "../dto/create-blog.dto";

@ApiTags('Blogs')
@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 5))
  @ApiCreatedResponse({
    description: 'Create a new blog post with multiple images',
  })
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^image\/(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 10_000_000,
        })
        .build(),
    )
    files: Array<Express.Multer.File>,
  ) {
    return await this.blogService.create(createBlogDto, files);
  }
}
