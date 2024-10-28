import { CartService } from '../services/cart.service';
import { CurrentUser } from 'src/modules/users/decorators/current-user.decorator';
import { User } from 'src/database/entities/user.entity';
import { AddToCartDto } from '../dto/cart.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateCartItemDto } from '../dto/update-cart.dto';
import { CartItem } from 'src/database/entities/cart-item.entity';
import { Cart } from 'src/database/entities/cart.entity';

@ApiTags('Carts')
@Controller('carts')
export class CartController {
    constructor(private cartService: CartService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Lấy giỏ hàng của người dùng thành công' })
    async getCart(@CurrentUser() user: User): Promise<Cart> {
        return await this.cartService.getCart(user);
    }

    // Thêm sản phẩm vào giỏ hàng
    @Post('add-item')
    @ApiBody({ type: AddToCartDto })
    @ApiResponse({ status: 201, description: 'Thêm sản phẩm vào giỏ hàng thành công' })
    async addItemToCart(
        @CurrentUser() user: User,
        @Body() addToCartDto: AddToCartDto,
    ): Promise<CartItem> {
        const { productId, sizeId, quantity, toppingIds } = addToCartDto;
        return await this.cartService.addItemToCart(user, productId, sizeId, quantity, toppingIds);
    }

    // Cập nhật số lượng của một sản phẩm trong giỏ hàng
    @Patch('update-item/:id')
    @ApiParam({ name: 'id', description: 'ID của sản phẩm trong giỏ hàng' })
    @ApiBody({ type: UpdateCartItemDto })
    @ApiResponse({ status: 200, description: 'Cập nhật số lượng sản phẩm thành công' })
    async updateCartItem(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCartItemDto: UpdateCartItemDto,
    ): Promise<CartItem> {
        const { quantity } = updateCartItemDto;
        return await this.cartService.updateCartItem(id, quantity);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    @Delete('remove-item/:id')
    @ApiParam({ name: 'id', description: 'ID của sản phẩm trong giỏ hàng' })
    @ApiResponse({ status: 200, description: 'Xóa sản phẩm khỏi giỏ hàng thành công' })
    async removeItemFromCart(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
        await this.cartService.removeItemFromCart(id);
    }
}
