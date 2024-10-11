// import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { OrderItem } from "src/database/entities/order-item.entity";
// import { Order } from "src/database/entities/order.entity";
// import { PaymentMethod } from "src/database/entities/payment-method";
// import { User } from "src/database/entities/user.entity";
// import { CartService } from "src/modules/carts/services/cart.service";
// import { Repository } from "typeorm";
// import { CreateOrderDto } from "../dto/create-order.dto"; // Assuming you have this DTO defined

// @Injectable()
// export class OrderService {
//     constructor(
//         @InjectRepository(Order)
//         private orderRepository: Repository<Order>,

//         @InjectRepository(OrderItem)
//         private orderItemRepository: Repository<OrderItem>,

//         @InjectRepository(PaymentMethod)
//         private paymentMethodRepository: Repository<PaymentMethod>,

//         private cartService: CartService,
//     ) {}

//     async placeOrder(user: User, paymentMethodId: number, buyerInfo: CreateOrderDto): Promise<Order> {
//         // Fetch user's cart
//         const cart = await this.cartService.getCartByUserId(user);
//         if (!cart || cart.cartItems.length === 0) {
//             throw new BadRequestException('Your cart is empty');
//         }

//         // Verify the payment method belongs to the user
//         const paymentMethod = await this.paymentMethodRepository.findOne({ 
//             where: { payment_method_id: paymentMethodId, user: { id: user.id } }
//         });
//         if (!paymentMethod) {
//             throw new BadRequestException('Invalid payment method');
//         }

//         // Create new order
//         const newOrder = this.orderRepository.create({
//             user,
//             paymentMethod,
//             buyer_name: buyerInfo.buyer_name,
//             buyer_phone: buyerInfo.buyer_phone,
//             buyer_email: buyerInfo.buyer_email,
//             franchise: { id: buyerInfo.franchise_id }, // Assuming franchise ID is in CreateOrderDto
//             status: 'pending',
//         });

//         await this.orderRepository.save(newOrder);

//         // Create order items based on cart items
//         for (const cartItem of cart.cartItems) {
//             const orderItem = this.orderItemRepository.create({
//                 order: newOrder,
//                 product: cartItem.product,
//                 quantity: cartItem.quantity,
//                 price: cartItem.product.price,
//             });
//             await this.orderItemRepository.save(orderItem);
//         }

//         // Clear the user's cart after the order is placed
//         await this.cartService.clearCart(user.id);

//         // Return the newly created order with its items
//         return this.orderRepository.findOne({
//             where: { id: newOrder.id },
//             relations: ['orderItems', 'orderItems.product'],
//         });
//     }

//     async getOrderById(orderId: number): Promise<Order> {
//         const order = await this.orderRepository.findOne({
//             where: { id: orderId },
//             relations: ['orderItems', 'orderItems.product'],  // Include order items and related product details
//         });
    
//         if (!order) {
//             throw new NotFoundException('Order not found');
//         }
    
//         return order;
//     }
    

//     // Update the order status (allowed only for employees, franchise owners, or admins)
//     async updateOrderStatus(user: User, orderId: number, status: string): Promise<Order> {
//         // Find the order
//         const order = await this.orderRepository.findOne({
//             where: { id: orderId },
//             relations: ['user', 'orderItems'],
//         });
//         if (!order) {
//             throw new NotFoundException('Order not found');
//         }

//         // Validate that the user has the appropriate role to update the status
//         if (!['employee', 'franchise_owner', 'admin'].includes(user.role)) {
//             throw new ForbiddenException('You do not have permission to update order status');
//         }

//         // Update the order status
//         order.status = status;
//         await this.orderRepository.save(order);

//         return order;
//     }
// }
