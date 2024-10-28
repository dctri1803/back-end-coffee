import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductSize } from "src/database/entities/product-sizes.entity";
import { Repository } from "typeorm";
import { CreateProductSizeDto } from "../dto/product-size.dto";

@Injectable()
export class SizeServices {
    constructor(
        @InjectRepository(ProductSize)
        private productSizeRepository: Repository<ProductSize>,
    ) {}

    async createSize(dto: CreateProductSizeDto): Promise<ProductSize> {
        const size = this.productSizeRepository.create(dto);
        return await this.productSizeRepository.save(size);
      }
    
      async getAllSizes(): Promise<ProductSize[]> {
        return await this.productSizeRepository.find();
      }
    
      async deleteSize(id: number): Promise<boolean> {
        const result = await this.productSizeRepository.delete(id);
        return result.affected > 0;
    }
}