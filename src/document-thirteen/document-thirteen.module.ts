import { Module } from "@nestjs/common";
import { DocumentThirteenController } from "./document-thirteen.controller";
import { DocumentThirteenService } from "./document-thirteen.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { DocumentTypeThirteenRepository } from "./document-type-thirteen.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentTypeThirteenRepository,
      DocumentRepository,
      StudentRepository,
      AuthorityRepository,
    ]),
  ],
  controllers: [DocumentThirteenController],
  providers: [DocumentThirteenService],
})
export class DocumentThirteenModule {}
