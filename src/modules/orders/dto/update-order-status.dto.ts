import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderStatusDto {
    @IsNotEmpty()
    @IsString()
    @IsIn(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])  // Restricting to specific allowed statuses
    status: string;
}
