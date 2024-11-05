import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    content: string;
  
    @IsString()
    @IsOptional()
    author?: string;
  
    @IsString()
    @IsOptional()
    category?: string;
  
    @IsArray()
    @IsOptional()
    tags?: string[];
}

