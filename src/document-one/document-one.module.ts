import { Module } from '@nestjs/common';
import { DocumentOneService } from './document-one.service';
import { DocumentOneController } from './document-one.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { DocumentTypeOneRepository } from './document-type-one.repository';
import { SignatureOneRepository } from './signature-one.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';

@Module({
  imports: [TypeOrmModule.forFeature(
    [DocumentRepository,
      StudentRepository,
      AuthorityRepository,
      DocumentTypeOneRepository,
      SignatureOneRepository,

    ])],
  providers: [DocumentOneService],
  controllers: [DocumentOneController]
})
export class DocumentOneModule { }
