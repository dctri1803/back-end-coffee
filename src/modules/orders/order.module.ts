// import { Module } from "@nestjs/common";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { Order } from "src/database/entities/order.entity";
// import { User } from "src/database/entities/user.entity";
// import { OrderService } from "./services/orders.service";
// import { OrderController } from "./controllers/oders.controller";
// import { OrderItem } from "src/database/entities/order-item.entity";
// import { PaymentMethod } from "src/database/entities/payment-method";

// @Module({
//     imports: [
//         TypeOrmModule.forFeature([Order, OrderItem, PaymentMethod, User]), // Add OrderItem here
//     ],
//     providers: [OrderService],
//     controllers: [OrderController]
// })
// export class OrderModules{}