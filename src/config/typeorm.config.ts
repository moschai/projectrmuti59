import {TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig:TypeOrmModuleOptions = {
    type:"mysql",
    host:'localhost',
    port:3306,
    username:'root',
    password:'root1234',
    database:'fte_rmuti_doc',
    entities: [__dirname + '/../**/*.entity.*'],
    synchronize : true
}