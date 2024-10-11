import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductImageDto } from './product-image.dto';
import { IsNumber, Min } from 'class-validator';
  
export class ProductDto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    description: string;
  
    @ApiPropertyOptional()
    quantity_sold: number;
  
    @ApiProperty()
    @IsNumber()
    @Min(0, { message: 'Price must not be less than 0' })
    price: number;
  
    @ApiProperty({ type: ProductImageDto, isArray: true })
    productImages: ProductImageDto[];
  
    @ApiProperty()
    created_at: Date;
  
    @ApiProperty()
    updated_at: Date;
  }