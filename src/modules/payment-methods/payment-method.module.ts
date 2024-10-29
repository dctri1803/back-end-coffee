import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentMethod } from "src/database/entities/payment-method";
import { PaymentMethodServices } from "./services/payment-method.service";
import { PaymentMethodController } from "./controller/payment-method.controller";

@Module({
    imports: [TypeOrmModule.forFeature([PaymentMethod])],
    providers: [PaymentMethodServices],
    controllers: [PaymentMethodController]
})
export class PaymentMethodModule {}