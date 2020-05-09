import { Module } from '@nestjs/common';
import { DocumentElevenController } from './document-eleven.controller';
import { DocumentElevenService } from './document-eleven.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { DocumentTypeElevenRepository } from './document-type-eleven.repository';
import { SignatureElevenRepository } from './signature-eleven.repository';

@Module({
  imports: [TypeOrmModule.forFeature(
    [DocumentRepository,
      StudentRepository,
      AuthorityRepository,
      DocumentTypeElevenRepository,
      SignatureElevenRepository,
    ])],
  controllers: [DocumentElevenController],
  providers: [DocumentElevenService]
})
export class DocumentElevenModule { }
