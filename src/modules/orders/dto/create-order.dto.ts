import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    buyer_name: string;

    @IsNotEmpty()
    @IsPhoneNumber(null)  // Specify a region code, e.g., 'VN' for Vietnam if needed
    buyer_phone: string;

    @IsNotEmpty()
    @IsEmail()
    buyer_email: string;

    @IsNotEmpty()
    @IsNumber()
    franchise_id: number;

    @IsNotEmpty()
    @IsNumber()
    payment_method_id: number;  // Include payment method for the order
}
