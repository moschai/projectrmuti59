import { Module } from '@nestjs/common';
import { DocumentFourteenController } from './document-fourteen.controller';
import { DocumentFourteenService } from './document-fourteen.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { DocumentTypeFourteenRepository } from './document-type-fourteen.repository';
import { SignatureFourteenRepository } from './signature-fourteen.repository';

@Module({
  imports: [TypeOrmModule.forFeature(
    [DocumentRepository,
      StudentRepository,
      AuthorityRepository,
      DocumentTypeFourteenRepository,
      SignatureFourteenRepository,
    ])],
  controllers: [DocumentFourteenController],
  providers: [DocumentFourteenService]
})
export class DocumentFourteenModule { }
