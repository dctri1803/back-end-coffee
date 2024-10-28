import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Topping } from "src/database/entities/topping.entity";
import { CreateToppingDto } from "../dto/create-topping.dto";

@Injectable()
export class ToppingService {
    constructor(
        @InjectRepository(Topping)
        private toppingRepository
    ) { }

    async findByIds(toppingIds: number[]): Promise<Topping[]> {
        const toppings = await this.toppingRepository.findByIds(toppingIds);
        if (toppings.length !== toppingIds.length) {
            throw new NotFoundException('Some toppings were not found');
        }
        return toppings;
    }

    async getAllToppings(): Promise<Topping[]> {
        return await this.toppingRepository.find();
    }

    async createTopping(createToppingDto: CreateToppingDto): Promise<Topping> {
        const topping = this.toppingRepository.create(createToppingDto);
        return await this.toppingRepository.save(topping);
    }

    async deleteTopping(id: number): Promise<void> {
        const result = await this.toppingRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Topping with ID ${id} not found`);
        }
    }
}