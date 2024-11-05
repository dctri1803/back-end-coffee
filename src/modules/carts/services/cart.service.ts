import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItem } from "src/database/entities/cart-item.entity";
import { Cart } from "src/database/entities/cart.entity";
import { ProductSize } from "src/database/entities/product-sizes.entity";
import { Product } from "src/database/entities/products.entity";
import { User } from "src/database/entities/user.entity";
import { ProductServices } from "src/modules/products/services/products.service";
import { ToppingService } from "src/modules/toppings/services/topping.service";
import { Repository } from "typeorm";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,
        @InjectRepository(ProductSize)
        private productSizeRepository: Repository<ProductSize>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private toppingService: ToppingService,
        private productService: ProductServices,
    ) { }

    async getCart(user: User): Promise<Cart> {
        try {
            const cart = await this.cartRepository.findOne({
                where: { user_id: user.id },
                relations: ['cartItems', 'cartItems.product', 'cartItems.size', 'cartItems.toppings'],
            });
            if (!cart) throw new NotFoundException('Cart not found');

            cart.cartItems.forEach(cartItem => {
                const sizePrice = Number(cartItem.size?.price_adjustment) || 0;
                const toppingsPrice = cartItem.toppings.reduce((sum, topping) => sum + topping.price, 0);
                cartItem.total_price = (cartItem.product.price + sizePrice + toppingsPrice) * cartItem.quantity;
            });

            cart.total_price = cart.cartItems.reduce((sum, item) => sum + item.total_price, 0);
            return cart;
        } catch (error) {
            console.error('Error fetching cart:', error.message);
            throw new BadRequestException(`Error fetching cart: ${error.message}`);
        }
    }

    async addItemToCart(
        user: User,
        productId: number,
        sizeId: number,
        quantity: number,
        toppingIds: number[],
    ) {
        try {
            // Check if the cart exists for the user, create if it doesn't
            let cart = await this.cartRepository.findOne({ where: { user_id: user.id } });
            if (!cart) {
                cart = this.cartRepository.create({ user_id: user.id });
                await this.cartRepository.save(cart);
            }

            // Validate product
            const product = await this.productRepository.findOne({ where: { id: productId } });
            if (!product) {
                throw new NotFoundException(`Product with ID ${productId} not found`);
            }

            // Validate size
            const size = await this.productSizeRepository.findOne({ where: { id: sizeId } });
            if (!size) {
                throw new NotFoundException(`Size with ID ${sizeId} not found`);
            }

            // Validate toppings
            let toppings = [];
            if (toppingIds && toppingIds.length > 0) {
                toppings = await this.toppingService.findByIds(toppingIds);
                const foundToppingIds = toppings.map(t => t.id);
                const missingToppingIds = toppingIds.filter(id => !foundToppingIds.includes(id));

                if (missingToppingIds.length > 0) {
                    throw new NotFoundException(`Toppings with IDs ${missingToppingIds.join(", ")} not found`);
                }
            }

            // Calculate total price for the item
            const toppingPrice = toppings.reduce((sum, topping) => sum + topping.price, 0);
            const itemTotalPrice = (Number(product.price) + Number(size.price_adjustment) + Number(toppingPrice)) * quantity;

            // Check if the item already exists in the cart
            let cartItem = await this.cartItemRepository.findOne({
                where: { cart: { id: cart.id }, product: { id: productId }, size: { id: sizeId } },
                relations: ['toppings'],
            });

            if (cartItem) {
                // Update existing item quantity and price
                cartItem.quantity += quantity;
                cartItem.total_price = (product.price + Number(size.price_adjustment) + toppingPrice) * cartItem.quantity;
            } else {
                // Create a new cart item
                cartItem = this.cartItemRepository.create({
                    cart,
                    product,
                    size,
                    quantity,
                    total_price: itemTotalPrice,
                    toppings,
                });
            }

            return await this.cartItemRepository.save(cartItem);
        } catch (error) {
            console.error('Error adding item to cart:', error.message);
            throw new BadRequestException(`Error adding item to cart: ${error.message}`);
        }
    }
    
    async updateCartItem(cartItemId: number, quantity: number) {
        try {
            if (quantity <= 0) throw new BadRequestException('Quantity must be greater than 0');

            const cartItem = await this.cartItemRepository.findOne({ where: { id: cartItemId } });
            if (!cartItem) throw new NotFoundException('Cart item not found');

            cartItem.quantity = quantity;
            return await this.cartItemRepository.save(cartItem);
        } catch (error) {
            console.error('Error updating cart item:', error.message);
            throw new BadRequestException(`Error updating cart item: ${error.message}`);
        }
    }

    async removeItemFromCart(cartItemId: number) {
        try {
            const cartItem = await this.cartItemRepository.findOne({ where: { id: cartItemId } });
            if (!cartItem) throw new NotFoundException('Cart item not found');

            return await this.cartItemRepository.remove(cartItem);
        } catch (error) {
            console.error('Error removing item from cart:', error.message);
            throw new BadRequestException(`Error removing item from cart: ${error.message}`);
        }
    }

    async clearCart(userId: number): Promise<void> {
        try {
            const cart = await this.cartRepository.findOne({ where: { user_id: userId } });
            if (cart) {
                await this.cartItemRepository.delete({ cart: { id: cart.id } });
                await this.cartRepository.remove(cart);
            }
        } catch (error) {
            console.error('Error clearing cart:', error.message);
            throw new BadRequestException(`Error clearing cart: ${error.message}`);
        }
    }
}
