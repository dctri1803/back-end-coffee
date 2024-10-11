import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Franchise } from "src/database/entities/franchises.entity";
import { UserServices } from "src/modules/users/services/users.service";
import { Repository } from "typeorm";
import { CreateFranchiseDto } from "../dto/create-franchises.dto";
import { UpdateFranchiseDto } from "../dto/update-franchises.dto";

@Injectable()
export class FranchisesService {
  constructor(
    @InjectRepository(Franchise)
    private franchisesRepository: Repository<Franchise>,
    private usersService: UserServices,
  ) {}

  async findAll(): Promise<Franchise[]> {
    return this.franchisesRepository.find();
  }

  async findOne(id: number): Promise<Franchise> {
    const franchise = await this.franchisesRepository.findOne({
      where: { id },
    });
    if (!franchise) {
      throw new NotFoundException(`Franchise with ID ${id} not found`);
    }
    return franchise;
  }

  async create(createFranchiseDto: CreateFranchiseDto): Promise<Franchise> {
    const owner = await this.usersService.findOne(createFranchiseDto.owner_id);
    if (!owner) {
      throw new NotFoundException(
        `User with ID ${createFranchiseDto.owner_id} not found`,
      );
    }

    const franchise = this.franchisesRepository.create({
      name: createFranchiseDto.name,
      owner,
      address: createFranchiseDto.address,
      phone_number: createFranchiseDto.phone_number,
    });
    return this.franchisesRepository.save(franchise);
  }

  async update(
    id: number,
    updateFranchiseDto: UpdateFranchiseDto,
  ): Promise<Franchise> {
    const franchise = await this.findOne(id);
    if (updateFranchiseDto.owner_id) {
      const owner_id = await this.usersService.findOne(
        updateFranchiseDto.owner_id,
      );
      if (!owner_id) {
        throw new NotFoundException(
          `User with ID ${updateFranchiseDto.owner_id} not found`,
        );
      }
      franchise.owner = owner_id;
    }
    Object.assign(franchise, updateFranchiseDto);
    return this.franchisesRepository.save(franchise);
  }

  async remove(id: number){
    const franchise = await this.findOne(id);
    await this.franchisesRepository.delete(franchise);
    return `Delete franchises with id ${id} successfully`
  }
}