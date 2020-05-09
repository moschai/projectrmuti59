import { Module } from '@nestjs/common';
import { DocumentFiveService } from './document-five.service';
import { DocumentFiveController } from './document-five.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { DocumentTypeFiveRepository } from './document-type-five.repository';
import { SignatureFiveRepository } from './signature-five.repository';

@Module({
  imports: [TypeOrmModule.forFeature(
    [DocumentRepository,
      StudentRepository,
      AuthorityRepository,
      DocumentTypeFiveRepository,
      SignatureFiveRepository,
    ])],
  providers: [DocumentFiveService],
  controllers: [DocumentFiveController]
})
export class DocumentFiveModule { }
