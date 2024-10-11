import { Delete, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateUserDto } from "../dto/update-user.dto";
import { Address } from "src/database/entities/address.entity";
import { UpdateAddressDto } from "../dto/update-address.dto";

Injectable() 
export class UserServices {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Address)
        private addressRepository: Repository<Address>,
        private dataSource: DataSource,
    ){}

    findAll() {
        return this.userRepository.find({
            relations:['addresses']
        })
    }


    findOne(id: number) {
        return this.userRepository.findOne({
          where: {id},
            relations:['addresses']
        });
    }

    async updateUser(
        user_id: number,
        updateUserDto: UpdateUserDto,
        addressDto?: UpdateAddressDto, // Include address DTO
        file?: Express.Multer.File,
    ): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
            // Find the user
            const user = await queryRunner.manager.findOne(User, { where: { id: user_id } });
            if (!user) {
                throw new NotFoundException('User not found');
            }
    
            // Hash the password if it needs updating
            if (updateUserDto.password) {
                const salt = await bcrypt.genSalt();
                updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
            }
    
            // Update user details
            Object.assign(user, updateUserDto);
    
            // Handle avatar update
            if (file) {
                if (user.avatar_url) {
                    const oldFilePath = path.join('public', user.avatar_url.replace(`${process.env.HOST}/`, ''));
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath); // Delete the old avatar file
                    }
                }
    
                const subFolderDir = `user/${user.id.toString()}`;
                const fileDir = path.join('public', subFolderDir);
                const filePath = path.join(fileDir, file.originalname);
    
                // Check and create folder if not exists
                if (!fs.existsSync(fileDir)) {
                    fs.mkdirSync(fileDir, { recursive: true });
                }
    
                fs.writeFileSync(filePath, file.buffer); // Save new avatar
                user.avatar_url = `${process.env.HOST}/${subFolderDir}/${file.originalname}`;
            }
    
            // Update or create address if addressDto is provided
            if (addressDto) {
                const address = await queryRunner.manager.findOne(Address, { where: { user_id: user.id } });
                if (address) {
                    // Update existing address
                    Object.assign(address, addressDto);
                    await queryRunner.manager.save(address);
                } else {
                    // Create a new address if not exists
                    const newAddress = this.addressRepository.create({ ...addressDto, user });
                    await queryRunner.manager.save(newAddress);
                }
            }
    
            // Save updated user
            const updatedUser = await queryRunner.manager.save(user);
            await queryRunner.commitTransaction();
    
            return updatedUser;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error in updateUser service:', error);
            throw new InternalServerErrorException('An error occurred while processing the user update');
        } finally {
            await queryRunner.release();
        }
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

}