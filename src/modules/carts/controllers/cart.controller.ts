import { CartService } from '../services/cart.service';
import { CurrentUser } from 'src/modules/users/decorators/current-user.decorator';
import { User } from 'src/database/entities/user.entity';
import { AddToCartDto } from '../dto/cart.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

@Controller('carts')
export class CartController {
    constructor(private cartService: CartService) {}

    @Get()
    async getCart(@CurrentUser() currentUser: User) {
        return await this.cartService.getCart(currentUser);
    }

    @Post()
    async addItemToCart(@CurrentUser() currentUser: User,
                        @Body() addToCartDto: AddToCartDto) {
        return await this.cartService.addItemToCart(currentUser, addToCartDto.productId, addToCartDto.quantity);
    }

    @Patch(':id')
    async updateCartItem(cartItemId: number, quantity: number) {
        return await this.cartService.updateCartItem(cartItemId, quantity)
    }

    @Delete(':cartItemId')
    async removeItemFromCart(@Param('cartItemId', ParseIntPipe) cartItemId: number) {
        return await this.cartService.removeItemFromCart(cartItemId);
    }
}
