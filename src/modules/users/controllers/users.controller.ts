import { Body, Controller, Delete, Get, NotFoundException, Param, ParseFilePipeBuilder, ParseIntPipe, Patch, Post, Put, Session, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AuthServices } from "../services/auth.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginDto } from "../dto/login.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UpdateAddressDto } from "../dto/update-address.dto";
import { UserServices } from "../services/users.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('users')
export class UsersController {
    constructor(
        private authService: AuthServices,
        private userService: UserServices
    ) { }

    @Get()
    async findAll() {
        return await this.userService.findAll()
    }

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

    @Patch(':id')
    @UseInterceptors(FileInterceptor('avatar_url'))
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
        @Body() addressDto?: UpdateAddressDto, // Nhận thêm addressDto
        @UploadedFile() file?: Express.Multer.File
  ) {
    const updatedUser = await this.userService.updateUser(id, updateUserDto, addressDto, file);
    if (!updatedUser) {
      throw new NotFoundException(`Người dùng với ID ${id} không tìm thấy.`);
    }
    return updatedUser;
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const userExists = await this.userService.findOne(id); // Giả sử bạn có một phương thức findOne để kiểm tra
    if (!userExists) {
      throw new NotFoundException(`Người dùng với ID ${id} không tìm thấy.`);
    }

    await this.userService.remove(id); 
    }
}