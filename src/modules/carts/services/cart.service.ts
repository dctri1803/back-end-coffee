// import { Injectable, NotFoundException } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { CartItem } from "src/database/entities/cart-item.entity";
// import { Cart } from "src/database/entities/cart.entity";
// import { User } from "src/database/entities/user.entity";
// import { ProductServices } from "src/modules/products/services/products.service";
// import { Repository } from "typeorm";

// @Injectable()
// export class CartService {
//     constructor(
//         @InjectRepository(Cart)
//         private cartRepository: Repository<Cart>,
//         @InjectRepository(CartItem)
//         private cartItemRepository: Repository<CartItem>,
//         private productService: ProductServices,
//     ) {}

//     async addItemToCart(user: User, productId: number, quantity: number): Promise<Cart> {
//         let cart = await this.cartRepository.findOne({ where: { user_id: user.id }, relations: ['cartItems'] });
        
//         if (!cart) {
//             cart = this.cartRepository.create({ user_id: user.id });
//             await this.cartRepository.save(cart);
//         }

//         const product = await this.productService.findOne(productId);
//         if (!product) {
//             throw new NotFoundException('Product not found');
//         }

//         const cartItem = this.cartItemRepository.create({
//             cart_id: cart.id,
//             product_id: productId,
//             quantity,
//         });
//         await this.cartItemRepository.save(cartItem);

//         return this.cartRepository.findOne({ where: { id: cart.id }, relations: ['cartItems', 'cartItems.product'] });
//     }

//     async getCartByUserId(user: User): Promise<Cart> {
//         return this.cartRepository.findOne({ where: { user_id: user.id }, relations: ['cartItems', 'cartItems.product'] });
//     }

//     async clearCart(userId: number): Promise<void> {
//         const cart = await this.cartRepository.findOne({
//             where: { user: { id: userId } },
//             relations: ['cartItems'],
//         });

//         if (!cart) {
//             throw new NotFoundException('Cart not found');
//         }

//         await this.cartItemRepository.remove(cart.cartItems);
//     }
// }