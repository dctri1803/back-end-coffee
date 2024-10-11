import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Franchise } from 'src/database/entities/franchises.entity';
import { UserModules } from '../users/user.module';
import { FranchisesService } from './services/franchises.service';
import { FranchisesController } from './controllers/franchises.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Franchise]), UserModules],
  providers: [FranchisesService],
  controllers: [FranchisesController],
})
export class FranchisesModule {}