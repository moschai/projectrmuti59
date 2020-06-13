import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from 'src/admin/admin.repository';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { secret } from 'src/config/secret.config';
import { JwtAdminStratygy } from './jwt-admin.strategy';
import { JwtAuthorityStratygy } from './jwt-authority.strategy';
import { AuthorityRepository } from 'src/authority/authority.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository, AuthorityRepository]),
  JwtModule.register({
    secret: secret,
    signOptions: {
      expiresIn: '3h'
    }
  }),
  PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAdminStratygy, JwtAuthorityStratygy],
  exports: [JwtAdminStratygy, JwtAuthorityStratygy]
})
export class AuthModule { }
