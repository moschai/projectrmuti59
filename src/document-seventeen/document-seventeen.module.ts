import { Module } from '@nestjs/common';
import { DocumentSeventeenController } from './document-seventeen.controller';
import { DocumentSeventeenService } from './document-seventeen.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { DocumentTypeSeventeenRepository } from './document-type-seventeen.repository';
import { SignatureSeventeenRepository } from './signature-seventeen.repository';
import { DocuemntSeventeenTableRepository } from './document-seventeen-table.repository';

@Module({
  imports: [TypeOrmModule.forFeature(
    [DocumentRepository,
      StudentRepository,
      AuthorityRepository,
      DocumentTypeSeventeenRepository,
      SignatureSeventeenRepository,
      DocuemntSeventeenTableRepository
    ])],
  controllers: [DocumentSeventeenController],
  providers: [DocumentSeventeenService]
})
export class DocumentSeventeenModule { }
