import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/database/entities/order.entity";
import { User } from "src/database/entities/user.entity";
import { OrderItem } from "src/database/entities/order-item.entity";
import { PaymentMethod } from "src/database/entities/payment-method";
import { OrderService } from "./services/orders.service";
import { OrderController } from "./controllers/oders.controller";
import { CartModules } from "../carts/cart.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderItem, PaymentMethod, User]), CartModules // Add OrderItem here
    ],
    providers: [OrderService],
    controllers: [OrderController]
})
export class OrderModules{}