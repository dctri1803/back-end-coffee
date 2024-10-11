// import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
// import { User } from "src/database/entities/user.entity";
// import { CurrentUser } from "src/modules/users/decorators/current-user.decorator";
// import { Roles } from "src/modules/users/decorators/roles.decorator";
// import { RolesGuard } from "src/guards/roles.guard";
// import { OrderService } from "../services/orders.service";
// import { CreateOrderDto } from "../dto/create-order.dto";
// import { UpdateOrderStatusDto } from "../dto/update-order-status.dto";

// @Controller('orders')
// export class OrderController {
//     constructor(private readonly orderService: OrderService) {}

//     // Place a new order
//     @Post()
//     async placeOrder(@CurrentUser() currentUser: User, @Body() createOrderDto: CreateOrderDto) {
//         return this.orderService.placeOrder(currentUser, createOrderDto.payment_method_id, createOrderDto);
//     }

//     // Get the order by ID
//     @Get(':id')
//     async getOrderById(@Param('id') orderId: number) {
//         return this.orderService.getOrderById(orderId);
//     }

//     // Update order status (Only accessible by employee, franchise owner, or admin)
//     @Patch(':id/status')
//     @UseGuards(RolesGuard)
//     @Roles(['employee', 'franchise_owner', 'admin'])
//     async updateOrderStatus(
//         @CurrentUser() currentUser: User, 
//         @Param('id') orderId: number, 
//         @Body() updateOrderStatusDto: UpdateOrderStatusDto
//     ) {
//         return this.orderService.updateOrderStatus(currentUser, orderId, updateOrderStatusDto.status);
//     }
// }
