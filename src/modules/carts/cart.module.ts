import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItem } from "src/database/entities/cart-item.entity";
import { Cart } from "src/database/entities/cart.entity";
import { ProductModules } from "../products/product.module"; // Make sure this is the correct path
import { User } from "src/database/entities/user.entity";
import { Product } from "src/database/entities/products.entity";
import { CartService } from "./services/cart.service";
import { CartController } from "./controllers/cart.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Cart, CartItem, User, Product]), ProductModules],
    providers: [CartService],
    controllers: [CartController]
})
export class CartModules {}