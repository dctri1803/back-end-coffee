// import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
// import { RolesGuard } from 'src/guards/roles.guard';
// import { Roles } from 'src/modules/users/decorators/roles.decorator';
// import { CartService } from '../services/cart.service';
// import { CurrentUser } from 'src/modules/users/decorators/current-user.decorator';
// import { User } from 'src/database/entities/user.entity';
// import { AddToCartDto } from '../dto/cart.dto';

// @Controller('cart')
// export class CartController {
//     constructor(private readonly cartService: CartService) {}

//     @Post('add')
//     async addItemToCart(@CurrentUser() currentUser: User, @Body() addToCartDto: AddToCartDto) {
//         return this.cartService.addItemToCart(currentUser, addToCartDto.productId, addToCartDto.quantity);
//     }

//     @Get()
//     async getCart(@CurrentUser() currentUser: User) {
//         return this.cartService.getCartByUserId(currentUser);
//     }
// }
