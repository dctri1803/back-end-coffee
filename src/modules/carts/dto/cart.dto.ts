import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class AddToCartDto {
    @ApiProperty({
        description: 'ID của sản phẩm',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    productId: number;

    @ApiProperty({
        description: 'ID của kích thước sản phẩm',
        example: 2,
    })
    @IsInt()
    @IsPositive()
    sizeId: number;

    @ApiProperty({
        description: 'Số lượng sản phẩm muốn thêm vào giỏ hàng',
        example: 3,
    })
    @IsInt()
    @IsPositive()
    quantity: number;

    @ApiProperty({
        description: 'Danh sách ID các topping đã chọn',
        example: [1, 3, 5],
        type: [Number],  // Chỉ định kiểu là mảng số nguyên
    })
    @IsArray()
    toppingIds: number[];
}
