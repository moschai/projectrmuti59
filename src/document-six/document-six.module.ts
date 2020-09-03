import { Module } from "@nestjs/common";
import { DocumentSixController } from "./document-six.controller";
import { DocumentSixService } from "./document-six.service";
import { DocumentSixTableRepository } from "./document-six-table.repository";
import { SignatureSixRepository } from "./signature-six.repository";
import { DocumentTypeSixRepository } from "./document-type-six.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { StudentRepository } from "src/student/student.repository";
import { DocumentRepository } from "src/document/document.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentRepository,
      StudentRepository,
      AuthorityRepository,
      DocumentTypeSixRepository,
      SignatureSixRepository,
      DocumentSixTableRepository,
    ]),
  ],
  controllers: [DocumentSixController],
  providers: [DocumentSixService],
})
export class DocumentSixModule {}
