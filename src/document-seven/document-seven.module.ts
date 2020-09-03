import { Module } from "@nestjs/common";
import { DocumentSevenController } from "./document-seven.controller";
import { DocumentSevenService } from "./document-seven.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { DocumentTypeSevenRepository } from "./document-type-seven.repository";
import { SignatureSevenRepository } from "./signature-seven.repository";
import { DocumentSevenTableRepository } from "./document-seven-table.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentRepository,
      StudentRepository,
      AuthorityRepository,
      DocumentTypeSevenRepository,
      SignatureSevenRepository,
      DocumentSevenTableRepository,
    ]),
  ],
  controllers: [DocumentSevenController],
  providers: [DocumentSevenService],
})
export class DocumentSevenModule {}
