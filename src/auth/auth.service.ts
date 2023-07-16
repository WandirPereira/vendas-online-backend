import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { hash, compare } from 'bcrypt';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService, private jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto): Promise<ReturnLogin> {
        const user: UserEntity | undefined = await this.userService.findUserByEmail(loginDto.email).catch(() => undefined);
        console.log('usuarioLogin', user);
        const isMatch = await compare(loginDto.password, user?.password || '')

        if (!user || !isMatch) {
            throw new NotFoundException('Email ou Password inválido!')
        }
        return {
            accessToken: await this.jwtService.signAsync({ ...new LoginPayload(user) }),
            user: new ReturnUserDto(user),
        };
    }
}
