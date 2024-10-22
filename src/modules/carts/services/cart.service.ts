import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItem } from "src/database/entities/cart-item.entity";
import { Cart } from "src/database/entities/cart.entity";
import { User } from "src/database/entities/user.entity";
import { ProductServices } from "src/modules/products/services/products.service";
import { Repository } from "typeorm";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,
        private productService: ProductServices,
    ) {}

    async getCart(user: User): Promise<Cart> {
        const cart = await this.cartRepository.findOne({
            where: { user_id: user.id },
            relations: ['cartItems', 'cartItems.product'],
        });
        if (!cart) throw new NotFoundException('Cart not found');
        return cart;
    }

    async addItemToCart(user: User, productId: number, quantity: number) {
        console.log(user.id);
        
        let cart = await this.cartRepository.findOne({ where: { user_id: user.id } });

        // Nếu người dùng chưa có giỏ hàng, tạo mới
        if (!cart) {
            cart = this.cartRepository.create({ user_id: user.id });
            await this.cartRepository.save(cart);
        }

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        let cartItem = await this.cartItemRepository.findOne({
            where: { cart_id: cart.id, product_id: productId },
        });

        if (cartItem) {
            // Cập nhật số lượng nếu đã tồn tại
            cartItem.quantity += quantity;
        } else {
            // Tạo sản phẩm mới trong giỏ hàng
            cartItem = this.cartItemRepository.create({
                cart_id: cart.id,
                product_id: productId,
                quantity
            });
        }
        await this.cartItemRepository.save(cartItem);
    }

    async updateCartItem(cartItemId: number, quantity: number) {
        if (quantity <= 0) {
            throw new BadRequestException('Số lượng phải lớn hơn 0');
        }

        const cartItem = await this.cartItemRepository.findOne({ where: { id: cartItemId } });
        if (!cartItem) throw new NotFoundException('Sản phẩm trong giỏ hàng không tồn tại');

        cartItem.quantity = quantity;
        return await this.cartItemRepository.save(cartItem);
    }
    
    // 4. Xóa sản phẩm khỏi giỏ hàng
    async removeItemFromCart(cartItemId: number) {
        const cartItem = await this.cartItemRepository.findOne({ where: { id: cartItemId } });
        if (!cartItem) throw new NotFoundException('Sản phẩm trong giỏ hàng không tồn tại');

        return await this.cartItemRepository.remove(cartItem);
    }
}