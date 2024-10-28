import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductSize } from "src/database/entities/product-sizes.entity";
import { SizeServices } from "../services/sizes.service";
import { CreateProductSizeDto } from "../dto/product-size.dto";

@ApiTags('Product Sizes')
@Controller('sizes')
export class SizeController {
    constructor( private sizeServices: SizeServices) {}
    @Get('sizes')
    @ApiResponse({ status: 200, description: 'Danh sách tất cả các size sản phẩm' })
    async getAllSizes(): Promise<ProductSize[]> {
        return await this.sizeServices.getAllSizes();
    }

    @Post('sizes')
    @ApiBody({ type: CreateProductSizeDto })
    @ApiResponse({ status: 201, description: 'Size sản phẩm đã được tạo thành công' })
    async createSize(@Body() dto: CreateProductSizeDto): Promise<ProductSize> {
        return await this.sizeServices.createSize(dto);
    }

    @Delete('size/:id')
    @ApiParam({ name: 'id', description: 'ID của size sản phẩm cần xóa', example: 1 })
    @ApiResponse({ status: 200, description: 'Size sản phẩm đã được xóa thành công' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy size sản phẩm với ID này' })
    async deleteSize(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const deleted = await this.sizeServices.deleteSize(id);
        if (!deleted) throw new NotFoundException(`Size với ID ${id} không tồn tại`);
    }
}