import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignatureFourRepository } from './signature-four.repository';
import { DocumentTypeFourRepository } from './document-type-four.repository';
import { CreateDocumentFourDto } from './dto/create-document-four.dto';

@Injectable()
export class DocumentFourService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepo: DocumentRepository,
        @InjectRepository(StudentRepository)
        private studentRepo: StudentRepository,
        @InjectRepository(DocumentTypeFourRepository)
        private docTypeFourRepo: DocumentTypeFourRepository,
        @InjectRepository(SignatureFourRepository)
        private signatureFourRepo: SignatureFourRepository,
        @InjectRepository(AuthorityRepository)
        private authorityRepo: AuthorityRepository
    ) {

    }
    async createDocument(
        createDocumentFourDto: CreateDocumentFourDto
    ) {
        const advisor = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFourDto.advisor_id } });
        if (!advisor) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const mastersubject = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFourDto.mastersubject_id } })
        if (!mastersubject) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const head_service_or_deanoffice = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFourDto.head_service_or_deanoffice_id } })
        if (!head_service_or_deanoffice) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const deputy_dean_research = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFourDto.deputy_dean_research_id } })
        if (!deputy_dean_research) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const dean = await this.authorityRepo.findOne({ where: { id_authority: createDocumentFourDto.dean_id } })
        if (!dean) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const student = await this.studentRepo.createStudent(createDocumentFourDto);
        const signatureFour = await this.signatureFourRepo.createSignature(createDocumentFourDto, advisor, mastersubject, head_service_or_deanoffice, deputy_dean_research, dean);
        const documentFour = await this.docTypeFourRepo.createDocumentFour(createDocumentFourDto, signatureFour);
        return await this.documentRepo.createDocumentTypeFour(student, documentFour);
        //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
    }
}
