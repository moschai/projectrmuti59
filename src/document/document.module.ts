import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DocumentRepository } from './document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { SubjectRepository } from 'src/student/subject.repository';
import { DocumentTypeOneRepository } from 'src/document-one/document-type-one.repository';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      DocumentRepository,
      StudentRepository,
      SubjectRepository,
      DocumentTypeOneRepository
    ])],
  controllers: [DocumentController],
  providers: [DocumentService]
})
export class DocumentModule { }
