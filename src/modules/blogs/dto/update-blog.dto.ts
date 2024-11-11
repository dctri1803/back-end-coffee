import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateBlogDto {
    @ApiProperty({
      description: 'Title of the blog post',
      example: 'Updated Coffee Shop Details',
      required: false,
    })
    @IsString()
    @IsOptional()
    title?: string;
  
    @ApiProperty({
      description: 'Content of the blog post',
      example: 'Our new coffee shop is now open with special offers!',
      required: false,
    })
    @IsString()
    @IsOptional()
    content?: string;
  
    @ApiProperty({
      description: 'Tags associated with the blog post',
      example: ['coffee', 'offers', 'location update'],
      required: false,
    })
    @IsArray()
    @IsOptional()
    tags?: string[];
  
    @ApiProperty({
      description: 'Array of image files for the blog post',
      type: 'array',
      items: { type: 'string', format: 'binary' },
      required: false,
    })
    @IsOptional()
    images?: Express.Multer.File[];
  }