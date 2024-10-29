import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsBoolean, IsDateString, MinLength, Min } from 'class-validator';

export class CreateVoucherDto {
  @ApiProperty({ example: 'DISCOUNT50', description: 'Mã voucher' })
  @IsNotEmpty()
  @MinLength(5)
  code: string;

  @ApiProperty({ example: 10, description: 'Phần trăm giảm giá' })
  @IsNumber({}, { message: 'discount_percent phải là số hợp lệ' })
  @Min(0)
  discount_percent: number;

  @ApiProperty({ example: 5000, description: 'Số tiền giảm giá cố định' })
  @IsNumber({}, { message: 'discount_amount phải là số hợp lệ' })
  @Min(0)
  discount_amount: number;

  @ApiProperty({ example: 20000, description: 'Giá trị đơn hàng tối thiểu để áp dụng voucher' })
  @IsNumber({}, { message: 'min_order_value phải là số hợp lệ' })
  @Min(0)
  min_order_value: number;

  @ApiProperty({ example: true, description: 'Voucher có đang hoạt động hay không' })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({ example: '2024-12-31T23:59:59Z', description: 'Ngày hết hạn của voucher' })
  @IsDateString()
  expires_at: Date;
}
