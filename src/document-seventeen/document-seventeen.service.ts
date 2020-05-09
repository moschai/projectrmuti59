import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { DocumentTypeSeventeenRepository } from './document-type-seventeen.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignatureSeventeenRepository } from './signature-seventeen.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { DocuemntSeventeenTableRepository } from './document-seventeen-table.repository';
import { CreateDocumentSeventeenDto } from './dto/create-document-seventeen.dto';

@Injectable()
export class DocumentSeventeenService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepo: DocumentRepository,
        @InjectRepository(StudentRepository)
        private studentRepo: StudentRepository,
        @InjectRepository(DocumentTypeSeventeenRepository)
        private docTypeSeventeenRepo: DocumentTypeSeventeenRepository,
        @InjectRepository(SignatureSeventeenRepository)
        private signatureSeventeenRepo: SignatureSeventeenRepository,
        @InjectRepository(AuthorityRepository)
        private authorityRepo: AuthorityRepository,
        @InjectRepository(DocuemntSeventeenTableRepository)
        private docuemntSeventeenTableRepo: DocuemntSeventeenTableRepository
    ) {

    }

    async createDocument(
        createDocumentSeventeenDto: CreateDocumentSeventeenDto
    ) {
        const teacherteath = await this.authorityRepo.findOne({ where: { id_authority: createDocumentSeventeenDto.teacherteath_id } });
        if (!teacherteath) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const head_service_or_deanoffice = await this.authorityRepo.findOne({ where: { id_authority: createDocumentSeventeenDto.head_service_or_deanoffice_id } })
        if (!head_service_or_deanoffice) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const student = await this.studentRepo.createStudent(createDocumentSeventeenDto);
        const signatureSeventeen = await this.signatureSeventeenRepo.createSignature(createDocumentSeventeenDto, teacherteath, head_service_or_deanoffice);

        const documentSeventeen = await this.docTypeSeventeenRepo.createDocumentSeventeen(createDocumentSeventeenDto, signatureSeventeen);
        await this.docuemntSeventeenTableRepo.createTableSeventeen(createDocumentSeventeenDto, documentSeventeen)

        return await this.documentRepo.createDocumentTypeSeventeen(student, documentSeventeen);
        //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
    }
}
