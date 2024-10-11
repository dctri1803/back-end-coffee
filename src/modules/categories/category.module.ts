import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/database/entities/category.entity";
import { CategoryServices } from "./services/category.service";
import { CategoriesController } from "./controllers/category.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoryServices],
    controllers: [CategoriesController]
}) 
export class CategoryModules{}
