import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService
    ) { }

    async login(loginDto: LoginDto): Promise<UserEntity> {
        const user: UserEntity | undefined = await this.userService.findUserByEmail(loginDto.email).catch(() => undefined);
        console.log('usuarioLogin', user);
        const isMatch = await compare(loginDto.password, user?.password || '')

        if (!user || !isMatch) {
            throw new NotFoundException('Email ou Password inválido!')
        }
        return user;
    }
}