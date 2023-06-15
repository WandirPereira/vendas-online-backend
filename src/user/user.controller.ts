import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
    @Get()
    async getAllUsers() {
        return JSON.stringify({ teste: 'abc' });
    }

    @Post()
    async createUser(
        @Body() createUser: CreateUserDto
    ) {
        console.log('createUser: ', createUser);
        return {
            ...createUser,
            password: undefined
        }
    }

}
