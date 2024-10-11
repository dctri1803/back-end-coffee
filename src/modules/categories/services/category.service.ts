import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/database/entities/category.entity";
import { categoryDto } from "../dto/category.dto";
import { Repository } from "typeorm";

@Injectable()
export class CategoryServices {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async createCategory( newCategory: categoryDto) {
        const category = this.categoryRepository.create({
            name: newCategory.name
        }) 
        return this.categoryRepository.save(category)
    }

    async deleteCategory(id){
        const category = await this.categoryRepository.findOne(id)
        if(!category) {
            return  'Category is not found'
        }
        else {
            await this.categoryRepository.delete(category);
            return `Delete category successfully`
        }
    }
}