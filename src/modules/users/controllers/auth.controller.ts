import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AuthServices } from "../services/auth.service";
import { ForgotPasswordDto } from "../dto/forget-password.dto";
import { UserServices } from "../services/users.service";
import { ResetPasswordDto } from "../dto/reset-password.dto";

@Controller('auth')
export class AuthController {
    constructor(private authServices: AuthServices,
        private userServices: UserServices
    ) {}

    @Post('forgot-password')
    async forgotPassword(@Body() body: ForgotPasswordDto) {
        if(!body.email) {
            return new BadRequestException('The email is required')
        }
        return await this.authServices.generateOtp(body.email);
    }

    @Post('reset-password')
    async resetPassword(@Body() body: ResetPasswordDto) {
        return await this.authServices.resetPassword(body.email, body.token, body.newPassword)
    }
    
}