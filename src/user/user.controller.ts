import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    //async getAllUsers(): Promise<UserEntity[]> {
    async getAllUsers(): Promise<ReturnUserDto[]> {
        //return JSON.stringify({ teste: 'abc' });
        return (await this.userService.getAllUsers()).map((userEntity) => new ReturnUserDto(userEntity));
    }

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        console.log('createUser: ', createUser);
        // return {
        //     ...createUser,
        //     password: undefined
        // }
        return this.userService.createUser(createUser)
    };

    @Get('/:userId')
    async getUserByIdUsingRelations(@Param('userId') userId: number): Promise<ReturnUserDto> {
        const usuario = (await this.userService.findUserByIdUsingRelations(userId));
        return new ReturnUserDto(usuario);
        //return this.userService.findUserByIdUsingRelations(userId);
    }

}
