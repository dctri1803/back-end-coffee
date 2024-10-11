// import { Module } from "@nestjs/common";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { CartItem } from "src/database/entities/cart-item.entity";
// import { Cart } from "src/database/entities/cart.entity";
// import { CartController } from "./controllers/cart.controller";
// import { CartService } from "./services/cart.service";
// import { ProductModules } from "../products/product.module"; // Make sure this is the correct path

// @Module({
//     imports: [TypeOrmModule.forFeature([Cart, CartItem]), ProductModules], // Import ProductModules
//     providers: [CartService],
//     controllers: [CartController],
// })
// export class CartModules {}