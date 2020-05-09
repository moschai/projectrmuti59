import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { DocumentTypeEightRepository } from './document-type-eight.reposity';
import { SignatureEightRepository } from './signature-eight.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { DocuemntEightTableRepository } from './document-eight-table.repository';
import { CreateDocumentEightDto } from './dto/create-document-eight.dto';

@Injectable()
export class DocumentEightService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepo: DocumentRepository,
        @InjectRepository(StudentRepository)
        private studentRepo: StudentRepository,
        @InjectRepository(DocumentTypeEightRepository)
        private docTypeEightRepo: DocumentTypeEightRepository,
        @InjectRepository(SignatureEightRepository)
        private signatureEightRepo: SignatureEightRepository,
        @InjectRepository(AuthorityRepository)
        private authorityRepo: AuthorityRepository,
        @InjectRepository(DocuemntEightTableRepository)
        private docuemntEightTableRepo: DocuemntEightTableRepository
    ) {

    }

    async createDocument(
        createDocumentEightDto: CreateDocumentEightDto
    ) {
        const advisor = await this.authorityRepo.findOne({ where: { id_authority: createDocumentEightDto.advisor_id } });
        if (!advisor) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const mastersubject = await this.authorityRepo.findOne({ where: { id_authority: createDocumentEightDto.mastersubject_id } })
        if (!mastersubject) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const head_service_or_deanoffice = await this.authorityRepo.findOne({ where: { id_authority: createDocumentEightDto.head_service_or_deanoffice_id } })
        if (!head_service_or_deanoffice) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const deputy_dean_research = await this.authorityRepo.findOne({ where: { id_authority: createDocumentEightDto.deputy_dean_research_id } })
        if (!deputy_dean_research) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const dean = await this.authorityRepo.findOne({ where: { id_authority: createDocumentEightDto.dean_id } })
        if (!dean) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const student = await this.studentRepo.createStudent(createDocumentEightDto);
        const signatureEight = await this.signatureEightRepo.createSignature(createDocumentEightDto, advisor, mastersubject, head_service_or_deanoffice, deputy_dean_research, dean);
        const documentEight = await this.docTypeEightRepo.createDocumentEight(createDocumentEightDto, signatureEight);
        await this.docuemntEightTableRepo.createTableEight(createDocumentEightDto, documentEight)

        return await this.documentRepo.createDocumentTypeEight(student, documentEight);
        //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
    }
}
