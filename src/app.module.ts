import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import path from 'path';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      //synchronize: true,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      //entities: [UserEntity],
      //migrations: ["1687209458357-create_table_user.ts"],
      migrations: [`${__dirname}/migration/{*.ts,*.js}`],
      migrationsRun: true,
    }),
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
