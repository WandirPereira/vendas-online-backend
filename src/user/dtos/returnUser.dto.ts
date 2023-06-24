import { IsString } from "class-validator";
import { UserEntity } from "../entities/user.entity";

export class ReturnUserDto {
    id: number;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    cpf: string;

    constructor(userEntity: UserEntity) {
        this.id = userEntity.id;
        this.name = userEntity.name;
        this.email = userEntity.email;
        this.phone = userEntity.phone;
        this.cpf = userEntity.cpf;
    }

}
