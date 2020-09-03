import { Module } from "@nestjs/common";
import { DocumentEightController } from "./document-eight.controller";
import { DocumentEightService } from "./document-eight.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { DocumentTypeEightRepository } from "./document-type-eight.reposity";
import { SignatureEightRepository } from "./signature-eight.repository";
import { DocumentEightTableRepository } from "./document-eight-table.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentRepository,
      StudentRepository,
      AuthorityRepository,
      DocumentTypeEightRepository,
      SignatureEightRepository,
      DocumentEightTableRepository,
    ]),
  ],
  controllers: [DocumentEightController],
  providers: [DocumentEightService],
})
export class DocumentEightModule {}
