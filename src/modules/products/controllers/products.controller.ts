import { Body, Controller, Delete, Get, NotFoundException, Param, ParseFilePipeBuilder, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductServices } from "../services/products.service";
import { Roles } from "src/modules/users/decorators/roles.decorator";
import { FilesInterceptor } from "@nestjs/platform-express";
import { RolesGuard } from "src/guards/roles.guard";
import { ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ProductDto } from "../dto/product.dto";
import { CreateProductsDto } from "../dto/create-product.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { PageDto } from "src/shared/dto/page.dto";
import { PaginationMetaDataDto } from "src/shared/dto/pagination-metadata.dto";
import { UpdateProductsDto } from "../dto/update-product.dto";

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productServices: ProductServices) { }

  @Get()
  async find(@Query() paginationDto: PaginationDto) {
    const [data, totalItem] = await this.productServices.findAll(paginationDto);

    return new PageDto(
      data,
      new PaginationMetaDataDto(totalItem, paginationDto),
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
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

  @UseGuards(RolesGuard)
  @Roles(['admin'])
  @UseInterceptors(FilesInterceptor('files', 3)) // Giới hạn tối đa 3 file
  @ApiCreatedResponse({
    type: UpdateProductsDto,
    description: 'update a product',
  })
  @ApiUnauthorizedResponse({
    description: 'You are not allowed to update a product',
  })
  @Patch('/:id')
  async update(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateProduct: UpdateProductsDto,
  ) {
    const updatedProduct = await this.productServices.update(id, updateProduct);
    return updatedProduct;
  }
  @UseGuards(RolesGuard)
  @Roles(['admin'])
  @UseInterceptors(FilesInterceptor('files', 3)) // Giới hạn tối đa 3 file
  @ApiCreatedResponse({
    type: ProductDto,
    description: 'Update a product with image upload',
  })
  @ApiUnauthorizedResponse({
    description: 'You are not allowed to create a product',
  })
  @Patch('/update-image/:id')
  async updateImage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduct: UpdateProductsDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: /^image\/(jpg|jpeg|png)$/,
      })
      .addMaxSizeValidator({
        maxSize: 10_000_000, // 10 MB
      })
      .build(),
    )
    files?: Array<Express.Multer.File>,
    ){
      const updatedProduct = await this.productServices.updateWithImages(id, updateProduct, files);
      return updatedProduct;
  }

  @Get('category/:id')
  async findProductsByCategory(@Param('id', ParseIntPipe) categoryId: number) {
    return await this.productServices.findProductsByCategory(categoryId);
  }

  @UseGuards(RolesGuard)
  @Roles(['admin'])
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.productServices.delete(id)
  }


}