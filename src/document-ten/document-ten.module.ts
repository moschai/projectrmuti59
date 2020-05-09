import { Module } from '@nestjs/common';
import { DocumentTenController } from './document-ten.controller';
import { DocumentTenService } from './document-ten.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { DocumentTypeTenRepository } from './document-type-ten.repository';
import { SignatureTenRepository } from './signature-ten.repository';
import { DocuemntTenTableRepository } from './document-ten-table.repository';

@Module({
  imports: [TypeOrmModule.forFeature(
    [DocumentRepository,
      StudentRepository,
      AuthorityRepository,
      DocumentTypeTenRepository,
      SignatureTenRepository,
      DocuemntTenTableRepository
    ])],
  controllers: [DocumentTenController],
  providers: [DocumentTenService]
})
export class DocumentTenModule { }
