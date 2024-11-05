import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({ description: 'ID của franchise' })
  @IsNumber()
  @IsNotEmpty()
  franchise_id: number;

  @ApiProperty({ description: 'ID của phương thức thanh toán' })
  @IsNumber()
  @IsNotEmpty()
  payment_method_id: number;

  @ApiProperty({ description: 'Tên khách hàng' })
  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @ApiProperty({ description: 'Địa chỉ giao hàng' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Số điện thoại' })
  @IsString()
  @IsNotEmpty()
  phone_number: string;
}