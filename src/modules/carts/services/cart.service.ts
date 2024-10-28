import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItem } from "src/database/entities/cart-item.entity";
import { Cart } from "src/database/entities/cart.entity";
import { ProductSize } from "src/database/entities/product-sizes.entity";
import { Product } from "src/database/entities/products.entity";
import { Topping } from "src/database/entities/topping.entity";
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
      const cart = await this.cartRepository.findOne({
          where: { user_id: user.id },
          relations: ['cartItems', 'cartItems.product', 'cartItems.size', 'cartItems.toppings'],
      });
  
      if (!cart) throw new NotFoundException('Cart not found');
  
      // Tính lại tổng giá cho từng mục trong giỏ hàng
      cart.cartItems.forEach(cartItem => {
          const sizePrice = Number(cartItem.size?.price_adjustment) || 0;
          const toppingsPrice = cartItem.toppings.reduce((sum, topping) => sum + topping.price, 0);
          
          // Cập nhật tổng giá cho từng mục
          cartItem.total_price = (cartItem.product.price + sizePrice + toppingsPrice) * cartItem.quantity;
      });
  
      // Tính tổng giá cho toàn bộ giỏ hàng
      const totalCartPrice = cart.cartItems.reduce((sum, item) => sum + item.total_price, 0);
      
      // Bạn có thể gán tổng giá vào một thuộc tính mới trong Cart hoặc trả về
      cart.total_price = totalCartPrice; // Nếu bạn đã thêm thuộc tính này vào Cart entity
  
      return cart;
  }

    // Thêm sản phẩm vào giỏ hàng với size và topping
  async addItemToCart(
    user: User,
    productId: number,
    sizeId: number,
    quantity: number,
    toppingIds: number[],
  ) {
    let cart = await this.cartRepository.findOne({ where: { user_id: user.id } });
    
    if (!cart) {
      cart = this.cartRepository.create({ user_id: user.id });
      await this.cartRepository.save(cart);
    }
    
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');
    
    const size = await this.productSizeRepository.findOne({ where: { id: sizeId } });
    if (!size) throw new NotFoundException('Size not found');
    
    const toppings = await this.toppingService.findByIds(toppingIds);
    const toppingPrice = toppings.reduce((sum, topping) => sum + topping.price, 0);
    
    const itemTotalPrice =
      (product.price + Number(size.price_adjustment) + toppingPrice) * quantity;
    
    let cartItem = await this.cartItemRepository.findOne({
      where: { cart: { id: cart.id }, product: { id: productId }, size: { id: sizeId } },
      relations: ['toppings'],
    });
    
    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.total_price += itemTotalPrice;
    } else {
      cartItem = this.cartItemRepository.create({
        cart, // Pass the cart object directly
        product,
        size,
        quantity,
        total_price: itemTotalPrice, // Ensure this is a number, not a string
        toppings,
      });
    }
    
    return await this.cartItemRepository.save(cartItem);
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