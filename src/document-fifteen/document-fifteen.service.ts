import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { DocumentTypeFifteenRepository } from './document-type-fifteen.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignatureFifteenRepository } from './signature-fifteen.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { CreateDocumentFifteenDto } from './dto/create-document-fifteen.dto';

@Injectable()
export class DocumentFifteenService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepo: DocumentRepository,
        @InjectRepository(StudentRepository)
        private studentRepo: StudentRepository,
        @InjectRepository(DocumentTypeFifteenRepository)
        private docTypeFifteenRepo: DocumentTypeFifteenRepository,
        @InjectRepository(SignatureFifteenRepository)
        private signatureFifteenRepo: SignatureFifteenRepository,
        @InjectRepository(AuthorityRepository)
        private authorityRepo: AuthorityRepository
    ) {

    }
    async createDocument(
        createDocumentFifteenDto: CreateDocumentFifteenDto
    ) {
        const advisor = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFifteenDto.advisor_id } });
        if (!advisor) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const mastersubject = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFifteenDto.mastersubject_id } })
        if (!mastersubject) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const authority_activity = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFifteenDto.authority_activity_id } })
        if (!authority_activity) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }


        const student = await this.studentRepo.createStudent(createDocumentFifteenDto);
        if (!authority_activity) {
            const signatureFifteen = await this.signatureFifteenRepo.createSignature(createDocumentFifteenDto, advisor, mastersubject, authority_activity);
            const documentFifteen = await this.docTypeFifteenRepo.createDocumentFifteen(createDocumentFifteenDto, signatureFifteen);
            return await this.documentRepo.createDocumentTypeFifteen(student, documentFifteen);
            //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
        }

    }
}