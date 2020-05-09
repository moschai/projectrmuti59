import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { DocumentTypeFourteenRepository } from './document-type-fourteen.repository';
import { SignatureFourteenRepository } from './signature-fourteen.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { CreateDocumentFourteenDto } from './dto/create-document-fourteen.dto';

@Injectable()
export class DocumentFourteenService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepo: DocumentRepository,
        @InjectRepository(StudentRepository)
        private studentRepo: StudentRepository,
        @InjectRepository(DocumentTypeFourteenRepository)
        private docTypeFourteenRepo: DocumentTypeFourteenRepository,
        @InjectRepository(SignatureFourteenRepository)
        private signatureFourteenRepo: SignatureFourteenRepository,
        @InjectRepository(AuthorityRepository)
        private authorityRepo: AuthorityRepository
    ) {

    }
    async createDocument(
        createDocumentFourteenDto: CreateDocumentFourteenDto
    ) {
        const advisor = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFourteenDto.advisor_id } });
        if (!advisor) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const mastersubject = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFourteenDto.mastersubject_id } })
        if (!mastersubject) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const head_service_or_deanoffice = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFourteenDto.head_service_or_deanoffice_id } })
        if (!head_service_or_deanoffice) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const deputy_dean_research = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFourteenDto.deputy_dean_research_id } })
        if (!deputy_dean_research) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const dean = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFourteenDto.dean_id } })
        if (!dean) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const student = await this.studentRepo.createStudent(createDocumentFourteenDto);
        const signatureFourteen = await this.signatureFourteenRepo.createSignature(createDocumentFourteenDto, advisor, mastersubject, head_service_or_deanoffice, deputy_dean_research, dean);
        const documentFourteen = await this.docTypeFourteenRepo.createDocumentFourteen(createDocumentFourteenDto, signatureFourteen);
        return await this.documentRepo.createDocumentTypeFourteen(student, documentFourteen);
        //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
    }
}
