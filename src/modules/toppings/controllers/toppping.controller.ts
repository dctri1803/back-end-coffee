import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ToppingService } from "../services/topping.service";
import { Topping } from "src/database/entities/topping.entity";
import { CreateToppingDto } from "../dto/create-topping.dto";

@ApiTags('Toppings')
@Controller('toppings')
export class ToppingController {
    constructor(private readonly toppingService: ToppingService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Lấy danh sách tất cả topping' })
    async getAllToppings(): Promise<Topping[]> {
        return await this.toppingService.getAllToppings();
    }

    @Post()
    @ApiBody({ type: CreateToppingDto })
    @ApiResponse({ status: 201, description: 'Topping đã được tạo thành công' })
    async createTopping(@Body() createToppingDto: CreateToppingDto): Promise<Topping> {
        return await this.toppingService.createTopping(createToppingDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Topping đã được xóa thành công' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy topping với ID đã cho' })
    async deleteTopping(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.toppingService.deleteTopping(id);
    }
}