import { Body, Controller, Delete, Get, Param, ParseFilePipeBuilder, ParseIntPipe, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductServices } from "../services/products.service";
import { Roles } from "src/modules/users/decorators/roles.decorator";
import { FilesInterceptor } from "@nestjs/platform-express";
import { RolesGuard } from "src/guards/roles.guard";
import { ApiCreatedResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ProductDto } from "../dto/product.dto";
import { CreateProductsDto } from "../dto/create-product.dto";

@Controller('products')
export class ProductController {
    constructor(private productServices: ProductServices){}


    @Get()
    async findAll() {
        return await this.productServices.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id:number) {
        return await this.productServices.findOne(id);
    }
    

    @UseGuards(RolesGuard)
    @Roles(['admin'])
    @UseInterceptors(FilesInterceptor('files', 3))
    @ApiCreatedResponse({
      type: ProductDto,
      description: 'Create a product with image upload',
    })
    @ApiUnauthorizedResponse({
      description: 'You are not allowed to create a product',
    })
    @Post()
    async create(
      @Body() product: CreateProductsDto,
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
      return await this.productServices.create(product, files);
    }

    @Get('category/:id')
    async findProductsByCategory(@Param('id', ParseIntPipe) categoryId: number) {
      return await this.productServices.findProductsByCategory(categoryId);
    }

    @Delete(':id') 
    async delete(@Param('id', ParseIntPipe) id: number)  {
      return await this.productServices.delete(id)
    }


}