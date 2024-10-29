import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ApplyVoucherDto {
  @ApiProperty({ example: 'DISCOUNT50', description: 'Mã voucher cần áp dụng' })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: '30000', description: 'Giá trị đơn hàng' })
  @IsNumberString()
  order_value: string;
}
