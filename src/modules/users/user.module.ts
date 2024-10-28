import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { AuthServices } from "./services/auth.service";
import { UsersController } from "./controllers/users.controller";
import { UserServices } from "./services/users.service";
import { AuthController } from "./controllers/auth.controller";
import { MailService } from "./services/mail.service";
import { PasswordResetToken } from "src/database/entities/password-reset-token.entity";
import { Address } from "src/database/entities/address.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, PasswordResetToken, Address])],
    providers: [AuthServices, UserServices, MailService],
    controllers: [UsersController, AuthController],
    exports: [UserServices],
})
export class UserModules { }