import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OrderService } from "../services/orders.service";
import { CreateOrderDto } from "../dto/create-order.dto";
import { CurrentUser } from "src/modules/users/decorators/current-user.decorator";
import { User } from "src/database/entities/user.entity";
import { Order } from "src/database/entities/order.entity";
import { UpdateOrderDetailsDto } from "../dto/update-order-details.dto";
import { UpdateOrderStatusDto } from "../dto/update-order-status.dto";

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @ApiBody({ type: CreateOrderDto })
    @ApiResponse({ status: 201, description: 'Tạo đơn hàng mới thành công' })
    async createOrder(
        @CurrentUser() user: User,
        @Body() createOrderDto: CreateOrderDto,
    ): Promise<Order> {
        return await this.orderService.createOrder(user, createOrderDto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Lấy danh sách tất cả đơn hàng thành công', type: [Order] })
    async getAllOrders(): Promise<Order[]> {
        return await this.orderService.getAllOrders();
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'ID của đơn hàng' })
    @ApiResponse({ status: 200, description: 'Thông tin chi tiết đơn hàng', type: Order })
    @ApiResponse({ status: 404, description: 'Đơn hàng không tồn tại' })
    async getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        return await this.orderService.getOrderById(id);
    }

    @Patch(':id')
    @ApiParam({ name: 'id', description: 'ID của đơn hàng' })
    @ApiBody({ type: UpdateOrderDetailsDto })
    @ApiResponse({ status: 200, description: 'Cập nhật thông tin đơn hàng thành công', type: Order })
    @ApiResponse({ status: 400, description: 'Thông tin không hợp lệ' })
    @ApiResponse({ status: 404, description: 'Đơn hàng không tồn tại' })
    async updateOrderDetails(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOrderDetailsDto: UpdateOrderDetailsDto,
        @CurrentUser() user: User,
    ): Promise<Order> {
        return await this.orderService.updateOrderDetails(id, updateOrderDetailsDto, user);
    }

    @Patch(':id/status')
    @ApiParam({ name: 'id', description: 'ID của đơn hàng' })
    @ApiBody({ type: UpdateOrderStatusDto })
    @ApiResponse({ status: 200, description: 'Cập nhật trạng thái đơn hàng thành công', type: Order })
    @ApiResponse({ status: 404, description: 'Đơn hàng không tồn tại' })
    async updateOrderStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    ): Promise<Order> {
        return await this.orderService.updateOrderStatus(id, updateOrderStatusDto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', description: 'ID của đơn hàng' })
    @ApiResponse({ status: 204, description: 'Đơn hàng đã được xóa thành công' })
    @ApiResponse({ status: 404, description: 'Đơn hàng không tồn tại' })
    async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.orderService.deleteOrder(id);
    }
}