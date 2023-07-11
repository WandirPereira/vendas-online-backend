import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
    //private users: UserEntity[] = [];

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { };


    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltOrRounds = 10;
        const passwordHashed = await hash(createUserDto.password, saltOrRounds);
        console.log('passwordHashed = ', passwordHashed);

        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: passwordHashed,
        })
    }

    async getAllUsers(): Promise<UserEntity[]> {
        //console.log('caminho-entity =', `${__dirname}/**/*.entity{.js,.ts}`);
        //console.log('caminho = ', `${__dirname}/migration/{.js,.ts}`);
        return this.userRepository.find();
    }

    async findUserByIdUsingRelations(userId: number): Promise<UserEntity> {
        //console.log('userId=', userId);
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
            //relations: ['addresses'],
            //Find Options da documentacao do TypeORM 
            relations: {
                addresses: {
                    city: {
                        state: true,
                    },
                },
            },
        });

        if (!user) {
            //throw new NotFoundException('Usuário não encontrado!');
            throw new NotFoundException(`Usuário com userId:${userId} não encontrado!`);
        }

        return user;
    }

    async findUserById(userId: number): Promise<UserEntity> {
        //console.log('userId=', userId);
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            //throw new NotFoundException('Usuário não encontrado!');
            throw new NotFoundException(`Usuário com userId:${userId} não encontrado!`);
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        //console.log('userId=', userId);
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            //throw new NotFoundException('Usuário não encontrado!');
            throw new NotFoundException(`Usuário com email: ${email} não encontrado!`);
        }

        return user;
    }
}
