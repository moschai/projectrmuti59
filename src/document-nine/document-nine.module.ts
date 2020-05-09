import { Module } from '@nestjs/common';
import { DocumentNineController } from './document-nine.controller';
import { DocumentNineService } from './document-nine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { DocumentTypeNineRepository } from './document-type-nine.repository';
import { SignatureNineRepository } from './signature-nine.repository';

@Module({
  imports: [TypeOrmModule.forFeature(
    [DocumentRepository,
      StudentRepository,
      AuthorityRepository,
      DocumentTypeNineRepository,
      SignatureNineRepository,
    ])],
  controllers: [DocumentNineController],
  providers: [DocumentNineService]
})
export class DocumentNineModule { }
