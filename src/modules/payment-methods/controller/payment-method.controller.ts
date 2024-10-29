import { Controller, Get } from "@nestjs/common";
import { PaymentMethodServices } from "../services/payment-method.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Payment Methods')
@Controller('payment-methods')
export class PaymentMethodController {
    constructor( private readonly paymentMethodService: PaymentMethodServices) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Lấy các hình thức thanh toán' })
    async getAllPaymentMethods() {
        return await this.paymentMethodService.getAllPaymentMethods()
    }
}