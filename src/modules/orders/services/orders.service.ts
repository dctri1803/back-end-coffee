import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItem } from "src/database/entities/order-item.entity";
import { Order } from "src/database/entities/order.entity";
import { User } from "src/database/entities/user.entity";
import { CartService } from "src/modules/carts/services/cart.service";
import { Repository } from "typeorm";
import { CreateOrderDto } from "../dto/create-order.dto";
import { UpdateOrderDetailsDto } from "../dto/update-order-details.dto";
import { UpdateOrderStatusDto } from "../dto/update-order-status.dto";
import { MailService } from "src/modules/users/services/mail.service";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
        private cartService: CartService,
        private readonly mailService: MailService
    ) {}

    async createOrder(user: User, createOrderDto: CreateOrderDto): Promise<Order> {
        const { address, phone_number, customer_name, payment_method_id } = createOrderDto;

        const cart = await this.cartService.getCart(user);
        if (!cart.cartItems.length) throw new BadRequestException('Giỏ hàng trống');

        const order = this.orderRepository.create({
            user_id: user.id,
            franchise_id: createOrderDto.franchise_id,
            payment_method_id,
            total_price: cart.total_price,
            address,
            phone_number,
            customer_name,
            status: 'pending',
        });

        const savedOrder = await this.orderRepository.save(order);

        const orderItems = cart.cartItems.map(cartItem =>
            this.orderItemRepository.create({
                order: savedOrder,
                product: cartItem.product,
                size: cartItem.size,
                quantity: cartItem.quantity,
                total_price: cartItem.total_price,
            }),
        );
        await this.orderItemRepository.save(orderItems);
        await this.cartService.clearCart(user.id);

        // Gửi email xác nhận đặt hàng
        const orderDetails = {
            customerName: customer_name,
            items: cart.cartItems.map(cartItem => ({
                name: cartItem.product.name,
                quantity: cartItem.quantity,
                price: cartItem.total_price,
            })),
            totalPrice: cart.total_price,
        };
        const emailContent = this.mailService.generateOrderEmailContent(orderDetails);
        await this.mailService.sendMail(user.email, 'Xác nhận đặt hàng thành công', emailContent);

        return savedOrder;
    }
    
    // Lấy danh sách tất cả đơn hàng
    async getAllOrders(): Promise<Order[]> {
        return await this.orderRepository.find({ relations: ['orderItems', 'customer', 'franchise', 'paymentMethod'] });
    }

    // Lấy thông tin chi tiết của một đơn hàng
    async getOrderById(id: number): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['orderItems', 'customer', 'franchise', 'paymentMethod'],
        });
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }

    // Cập nhật thông tin đơn hàng - dành cho khách hàng
    async updateOrderDetails(id: number, updateOrderDetailsDto: UpdateOrderDetailsDto, user: User): Promise<Order> {
        const order = await this.getOrderById(id);
        
        // Kiểm tra quyền truy cập của người dùng
        if (order.user_id !== user.id) throw new BadRequestException('Không thể chỉnh sửa đơn hàng của người khác');

        // Cập nhật thông tin đơn hàng
        const { address, phone_number, customer_name } = updateOrderDetailsDto;
        order.address = address ?? order.address;
        order.phone_number = phone_number ?? order.phone_number;
        order.customer_name = customer_name ?? order.customer_name;
        
        return await this.orderRepository.save(order);
    }

    // Cập nhật trạng thái đơn hàng - dành cho nhân viên
    async updateOrderStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order> {
        const order = await this.getOrderById(id);

        // Kiểm tra trạng thái mới và cập nhật
        order.status = updateOrderStatusDto.status;
        return await this.orderRepository.save(order);
    }

    // Xóa đơn hàng
    async deleteOrder(id: number): Promise<void> {
        const order = await this.getOrderById(id);
        await this.orderRepository.remove(order);
    }
}
