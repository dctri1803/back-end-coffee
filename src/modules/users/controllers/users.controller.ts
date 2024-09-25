import { Body, Controller, Post, Session } from "@nestjs/common";
import { AuthServices } from "../services/auth.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginDto } from "../dto/login.dto";

@Controller('users')
export class UsersController {
    constructor(
        private authService: AuthServices,
    ) { }

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        return await this.authService.register(body)
    }

    @Post('login')
    async login(
        @Body() body: LoginDto,
        @Session() session:Record<string, any>
    ) {
        console.log('>>>> session: ', session);
        const user = await this.authService.login(body.email, body.password);
        session.userId = user.id;
        return `Login successfully`
    }
}