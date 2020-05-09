import { Module } from '@nestjs/common';
import { DocumentFourService } from './document-four.service';
import { DocumentFourController } from './document-four.controller';
import { SignatureFourRepository } from './signature-four.repository';
import { DocumentTypeFourRepository } from './document-type-four.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { StudentRepository } from 'src/student/student.repository';
import { DocumentRepository } from 'src/document/document.repository';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature(
    [DocumentRepository,
      StudentRepository,
      AuthorityRepository,
      DocumentTypeFourRepository,
      SignatureFourRepository,
    ])],
  providers: [DocumentFourService],
  controllers: [DocumentFourController]
})
export class DocumentFourModule { }
