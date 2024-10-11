import { ApiProperty } from '@nestjs/swagger';

export class ProductImageDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  image_url: string;

  @ApiProperty()
  product_id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}