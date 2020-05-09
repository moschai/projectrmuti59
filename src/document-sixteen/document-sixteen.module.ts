import { Module } from '@nestjs/common';
import { DocumentSixteenController } from './document-sixteen.controller';
import { DocumentSixteenService } from './document-sixteen.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { SignatureSixteenRepository } from './signature-sixteen.repository';
import { DocumentTypeSixteenRepository } from './document-type-sixteen.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    DocumentTypeSixteenRepository,
    DocumentRepository,
    StudentRepository,
    SignatureSixteenRepository,
    AuthorityRepository])],
  controllers: [DocumentSixteenController],
  providers: [DocumentSixteenService]
})
export class DocumentSixteenModule { }
