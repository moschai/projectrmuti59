import { Module } from "@nestjs/common";
import { AuthorityController } from "./authority.controller";
import { AuthorityService } from "./authority.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthorityRepository } from "./authority.repository";
import { MajorRepository } from "./major.repository";
import { FacultyRepository } from "./faculty.reposity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthorityRepository,
      MajorRepository,
      FacultyRepository,
    ]),
  ],
  controllers: [AuthorityController],
  providers: [AuthorityService],
})
export class AuthorityModule {}
