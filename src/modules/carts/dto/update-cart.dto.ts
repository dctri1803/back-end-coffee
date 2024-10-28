import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class UpdateCartItemDto {
    @ApiProperty({ example: 5, description: 'Số lượng mới của sản phẩm' })
    @IsPositive()
    quantity: number;
}
