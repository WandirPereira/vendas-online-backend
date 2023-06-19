import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers(): Promise<UserEntity[]> {
        //return JSON.stringify({ teste: 'abc' });
        return this.userService.getAllUsers();
    }

    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        console.log('createUser: ', createUser);
        // return {
        //     ...createUser,
        //     password: undefined
        // }
        return this.userService.createUser(createUser)
    };

}
