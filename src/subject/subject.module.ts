import { Module } from "@nestjs/common";
import { SubjectController } from "./subject.controller";
import { SubjectService } from "./subject.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubjectRepository } from "./subject.repository";

@Module({
  imports: [TypeOrmModule.forFeature([SubjectRepository])],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
