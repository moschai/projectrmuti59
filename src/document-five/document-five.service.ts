import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentTypeFiveRepository } from './document-type-five.repository';
import { SignatureFiveRepository } from './signature-five.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { CreateDocumentFiveDto } from './dto/create-document-five.dto';

@Injectable()
export class DocumentFiveService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepo: DocumentRepository,
        @InjectRepository(StudentRepository)
        private studentRepo: StudentRepository,
        @InjectRepository(DocumentTypeFiveRepository)
        private docTypeFiveRepo: DocumentTypeFiveRepository,
        @InjectRepository(SignatureFiveRepository)
        private signatureFiveRepo: SignatureFiveRepository,
        @InjectRepository(AuthorityRepository)
        private authorityRepo: AuthorityRepository
    ) {

    }
    async createDocument(
        createDocumentFiveDto: CreateDocumentFiveDto
    ) {
        const advisor = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFiveDto.advisor_id } });
        if (!advisor) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const mastersubject = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFiveDto.mastersubject_id } })
        if (!mastersubject) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const head_service_or_deanoffice = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFiveDto.head_service_or_deanoffice_id } })
        if (!head_service_or_deanoffice) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const deputy_dean_research = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFiveDto.deputy_dean_research_id } })
        if (!deputy_dean_research) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const dean = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFiveDto.dean_id } })
        if (!dean) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const student = await this.studentRepo.createStudent(createDocumentFiveDto);
        const signatureFive = await this.signatureFiveRepo.createSignature(createDocumentFiveDto, advisor, mastersubject, head_service_or_deanoffice, deputy_dean_research, dean);
        const documentFive = await this.docTypeFiveRepo.createDocumentFive(createDocumentFiveDto, signatureFive);
        return await this.documentRepo.createDocumentTypeFive(student, documentFive);
        //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
    }
}
