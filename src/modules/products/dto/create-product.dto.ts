import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, Min } from "class-validator";
import { Type } from "class-transformer";  // Add this import

export class CreateProductsDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Type(() => Number) // Transform input to a number
  price: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity_sold: number;

  // @ApiProperty({ type: Number })
  // @IsNumber()
  // @IsNotEmpty()
  // @Type(() => Number) // Transform input to a number
  // franchise_id: number;

  @IsOptional()
  @IsArray()
  category_ids?: number[]
}
