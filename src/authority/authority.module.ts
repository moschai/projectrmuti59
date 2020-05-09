import { Module } from '@nestjs/common';
import { AuthorityController } from './authority.controller';
import { AuthorityService } from './authority.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorityRepository } from './authority.repository';
import { MajorRepository } from './major.repository';

@Module({
  imports:[TypeOrmModule.forFeature([AuthorityRepository,MajorRepository])],
  controllers: [AuthorityController],
  providers: [AuthorityService]
})
export class AuthorityModule {}
