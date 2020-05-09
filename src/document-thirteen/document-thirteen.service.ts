import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { DocumentTypeThirteenRepository } from './document-type-thirteen.repository';
import { SignatureThirteenRepository } from './signature-thirteen.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { CreateDocumentThirteenDto } from './dto/create-document-thirteen.dto';

@Injectable()
export class DocumentThirteenService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepo: DocumentRepository,
        @InjectRepository(StudentRepository)
        private studentRepo: StudentRepository,
        @InjectRepository(DocumentTypeThirteenRepository)
        private docTypeThirteenRepo: DocumentTypeThirteenRepository,
        @InjectRepository(SignatureThirteenRepository)
        private signatureThirteenRepo: SignatureThirteenRepository,
        @InjectRepository(AuthorityRepository)
        private authorityRepo: AuthorityRepository
    ) {

    } async createDocument(
        createDocumentThirteenDto: CreateDocumentThirteenDto
    ) {
        const studentt = await this.authorityRepo.findOne({ where: { id_authority: createDocumentThirteenDto.studentt_id } });
        if (!studentt) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }

        const student = await this.studentRepo.createStudent(createDocumentThirteenDto);
        const signatureSixteen = await this.signatureThirteenRepo.createSignature(createDocumentThirteenDto, studentt);
        const documentSixteen = await this.docTypeThirteenRepo.createDocumentThirteen(createDocumentThirteenDto, signatureSixteen);
        return await this.documentRepo.createDocumentTypeThirteen(student, documentSixteen);
        //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
    }
}
