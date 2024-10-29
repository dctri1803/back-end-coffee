import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentMethod } from "src/database/entities/payment-method";
import { Repository } from "typeorm";

@Injectable()
export class PaymentMethodServices {

    constructor(
        @InjectRepository(PaymentMethod)
        private paymentMethodRepository: Repository<PaymentMethod>
    ) {}

    async getAllPaymentMethods(): Promise<PaymentMethod[]> {
        return await this.paymentMethodRepository.find();
    }
}