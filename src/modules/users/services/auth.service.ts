import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { plainToInstance } from "class-transformer";
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { MailService } from "./mail.service";
import { PasswordResetToken } from "src/database/entities/password_reset_token.entity";

@Injectable()
export class AuthServices{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(PasswordResetToken)
        private passwordResetTokenRepository: Repository<PasswordResetToken>,
        private mailService: MailService,
    ){}

    async register(
        createUser: CreateUserDto,
    ) {
        const isExit = await this.userRepository.existsBy({
            email: createUser.email
        })

        if (isExit) {
            return new BadRequestException('User already exists');
        }
        
        else {
            const salt = await bcrypt.genSalt();
            const passwordhashed = await bcrypt.hash(createUser.password, salt)

            const newUser = await this.userRepository.save({
                ...createUser,
                password:passwordhashed,
            });
            return plainToInstance(User, newUser)
        }
    }

    async login(email: string, password: string) {
        console.log('login')
        const user = await this.userRepository.findOne({
            where: {email},
            select: ['id', 'password']
        });
        
        if(!user) {
            throw new BadRequestException('Invalid email or password')
        } else {
            const hashedPassword = user.password;
            const isMatch = await bcrypt.compare(password, hashedPassword)

            if (isMatch) {
                return user
            } else {
                throw new BadRequestException('Invalid email or password')
            }
        }
    }

    async generateOtp(email: string){
        const user = await this.userRepository.findOne({
            where: {email},
        });
        if(!user) {
            throw new BadRequestException('User not found');
        } else {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const tokenExpiration  = moment().add(10, 'minutes').toDate();

            await this.passwordResetTokenRepository.save({
                token: otp,
                expired_at: tokenExpiration,
                user_id: user.id
            });
            await this.mailService.sendOtp(email, otp);

            return { status: 'OK', message: 'OTP sent to email' };     
        } 
    }
    

    async resetPassword(email: string, token: string, newPassword: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new BadRequestException('User not found');
        }
    
        const resetToken = await this.passwordResetTokenRepository.findOne({
            where: { user_id: user.id, token },
        });
    
        if (!resetToken || resetToken.expired_at < new Date()) {
            throw new BadRequestException('Invalid or expired token');
        }
    
        if (typeof newPassword !== 'string') {
            throw new BadRequestException('Password must be a string');
        }
    
        // Tạo salt và hash password
        const salt = await bcrypt.genSalt(10);  // Sử dụng bcrypt.genSalt với số vòng rõ ràng
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        // Cập nhật mật khẩu người dùng
        user.password = hashedPassword;
        await this.userRepository.save(user);
    
        // Xóa token sau khi reset password thành công
        await this.passwordResetTokenRepository.delete({ id: resetToken.id });
    
        return { message: 'Password reset successfully' };
    }
}