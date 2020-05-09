import { Module } from '@nestjs/common';
import { DocumentTwoService } from './document-two.service';
import { DocumentTwoController } from './document-two.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentTypeTwoRepository } from './document-type-two.repository';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { SignatureTwoRepository } from './signature-two.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentTypeTwoRepository, DocumentRepository, StudentRepository, SignatureTwoRepository, AuthorityRepository])],
  providers: [DocumentTwoService],
  controllers: [DocumentTwoController]
})
export class DocumentTwoModule { }
