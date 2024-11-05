import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItem } from "src/database/entities/cart-item.entity";
import { Cart } from "src/database/entities/cart.entity";
import { ProductModules } from "../products/product.module"; // Make sure this is the correct path
import { User } from "src/database/entities/user.entity";
import { Product } from "src/database/entities/products.entity";
import { CartService } from "./services/cart.service";
import { CartController } from "./controllers/cart.controller";
import { ProductSize } from "src/database/entities/product-sizes.entity";
import { Topping } from "src/database/entities/topping.entity";
import { ToppingModules } from "../toppings/topping.module";

@Module({
    imports: [TypeOrmModule.forFeature([Cart, CartItem, User, Product, ProductSize, Topping]), ProductModules, ToppingModules],
    providers: [CartService],
    controllers: [CartController],
    exports: [CartService]
})
export class CartModules {}