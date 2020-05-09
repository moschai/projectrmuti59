import { Module } from '@nestjs/common';
import { DocumentThreeService } from './document-three.service';
import { DocumentThreeController } from './document-three.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentTypeThreeRepository } from './document-type-three.repository';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { SignatureThreeRepository } from './signature-three-repository';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentTypeThreeRepository, DocumentRepository, StudentRepository, SignatureThreeRepository, AuthorityRepository])],
  providers: [DocumentThreeService],
  controllers: [DocumentThreeController]
})
export class DocumentThreeModule { }
