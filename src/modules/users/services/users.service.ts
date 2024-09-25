import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";

Injectable() 
export class UserServices {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    findOne(id: number) {
        return this.userRepository.findOneBy({
          id,
        });
    }

}