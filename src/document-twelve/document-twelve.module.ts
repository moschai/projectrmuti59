import { Module } from '@nestjs/common';
import { DocumentTwelveController } from './document-twelve.controller';
import { DocumentTwelveService } from './document-twelve.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { StudentRepository } from 'src/student/student.repository';
import { DocumentTypeTwelveRepository } from './document-type-twelve.repository';
import { SignatureTwelveRepository } from './signature-twelve.repository';

@Module({
  imports: [TypeOrmModule.forFeature(
    [DocumentRepository,
      StudentRepository,
      AuthorityRepository,
      DocumentTypeTwelveRepository,
      SignatureTwelveRepository,
    ])],
  controllers: [DocumentTwelveController],
  providers: [DocumentTwelveService]
})
export class DocumentTwelveModule { }
