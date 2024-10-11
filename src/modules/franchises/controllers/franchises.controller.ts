import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    ParseIntPipe,
    Patch,
} from '@nestjs/common';
import { FranchisesService } from '../services/franchises.service';
import { Franchise } from 'src/database/entities/franchises.entity';
import { CreateFranchiseDto } from '../dto/create-franchises.dto';
import { UpdateFranchiseDto } from '../dto/update-franchises.dto';
 
  
  @Controller('franchises')
  export class FranchisesController {
    constructor(private readonly franchisesService: FranchisesService) {}
  
    @Get()
    async findAll(): Promise<Franchise[]> {
      return this.franchisesService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Franchise> {
      return this.franchisesService.findOne(id);
    }
  
    @Post()
    async create(
      @Body() createFranchiseDto: CreateFranchiseDto,
    ): Promise<Franchise> {
      return this.franchisesService.create(createFranchiseDto);
    }
  
    @Patch(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateFranchiseDto: UpdateFranchiseDto,
    ): Promise<Franchise> {
      return this.franchisesService.update(id, updateFranchiseDto);
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number){
      return this.franchisesService.remove(id);
    }
  }