import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CategoryServices } from "../services/category.service";
import { categoryDto } from "../dto/category.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoryServices){}
    @Get()
    async findAll () {
        return this.categoriesService.findAll()
    }

    @Post()
    async create(@Body() body: categoryDto) {
        return this.categoriesService.createCategory(body)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.deleteCategory(id)
    }
    
}