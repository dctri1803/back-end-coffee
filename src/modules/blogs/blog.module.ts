import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogComment } from "src/database/entities/blog-comments.entity";
import { BlogImage } from "src/database/entities/blog-image.entity";
import { BlogPost } from "src/database/entities/blog-post.entity";
import { BlogService } from "./services/blog.service";
import { BlogController } from "./controllers/blog.controller";

@Module({
    imports: [TypeOrmModule.forFeature([BlogPost, BlogImage, BlogComment])],
    providers: [BlogService],
    controllers: [BlogController]
})
export class BlogModules {}