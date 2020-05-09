import { Module } from '@nestjs/common';
import { DocumentFifteenController } from './document-fifteen.controller';
import { DocumentFifteenService } from './document-fifteen.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { DocumentTypeFifteenRepository } from './document-type-fifteen.repository';
import { SignatureFifteenRepository } from './signature-fifteen.repository';

@Module({
  imports: [TypeOrmModule.forFeature(
    [DocumentRepository,
      StudentRepository,
      AuthorityRepository,
      DocumentTypeFifteenRepository,
      SignatureFifteenRepository,
    ])],
  controllers: [DocumentFifteenController],
  providers: [DocumentFifteenService]
})
export class DocumentFifteenModule { }
