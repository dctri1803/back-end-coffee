import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export enum OrderStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    SHIPPED = 'shipped',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export class UpdateOrderStatusDto {
    @ApiProperty({ 
        example: OrderStatus.CONFIRMED, 
        description: 'Trạng thái mới của đơn hàng', 
        enum: OrderStatus 
    })
    @IsEnum(OrderStatus, { message: 'Trạng thái đơn hàng không hợp lệ' })
    status: OrderStatus;
}