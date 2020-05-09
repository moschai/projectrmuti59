import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from 'src/document/document.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from 'src/student/student.repository';
import { DocumentTypeTwoRepository } from './document-type-two.repository';
import { SignatureTwoRepository } from './signature-two.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { CreateDocumentTwoDto } from './dto/create-document-two.dto';

@Injectable()
export class DocumentTwoService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepo: DocumentRepository,
        @InjectRepository(StudentRepository)
        private studentRepo: StudentRepository,
        @InjectRepository(DocumentTypeTwoRepository)
        private docTypeTwoRepo: DocumentTypeTwoRepository,
        @InjectRepository(SignatureTwoRepository)
        private signatureTwoRepo: SignatureTwoRepository,
        @InjectRepository(AuthorityRepository)
        private authorityRepo: AuthorityRepository
    ) {

    } async createDocument(
        createDocumentTwoDto: CreateDocumentTwoDto
    ) {
        const advisor = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTwoDto.advisor_id } });
        if (!advisor) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const mastersubject = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTwoDto.mastersubject_id } })
        if (!mastersubject) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const head_service_or_deanoffice = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTwoDto.head_service_or_deanoffice_id } })
        if (!head_service_or_deanoffice) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const deputy_dean_research = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTwoDto.deputy_dean_research_id } })
        if (!deputy_dean_research) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const dean = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTwoDto.dean_id } })
        if (!dean) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const student = await this.studentRepo.createStudent(createDocumentTwoDto);
        const signatureTwo = await this.signatureTwoRepo.createSignature(createDocumentTwoDto, advisor, mastersubject, head_service_or_deanoffice, deputy_dean_research, dean);
        const documentTwo = await this.docTypeTwoRepo.createDocumentTwo(createDocumentTwoDto, signatureTwo);
        return await this.documentRepo.createDocumentTypeTwo(student, documentTwo);
        //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
    }
}
