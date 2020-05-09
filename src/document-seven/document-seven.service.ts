import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from 'src/document/document.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from 'src/student/student.repository';
import { DocumentTypeSevenRepository } from './document-type-seven.repository';
import { SignatureSevenRepository } from './signature-seven.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { CreateDocumentSevenDto } from './dto/create-document-seven.dto';
import { DocuemntSevenTableRepository } from './document-seven-table.repository'

@Injectable()
export class DocumentSevenService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepo: DocumentRepository,
        @InjectRepository(StudentRepository)
        private studentRepo: StudentRepository,
        @InjectRepository(DocumentTypeSevenRepository)
        private docTypeSevenRepo: DocumentTypeSevenRepository,
        @InjectRepository(SignatureSevenRepository)
        private signatureSevenRepo: SignatureSevenRepository,
        @InjectRepository(AuthorityRepository)
        private authorityRepo: AuthorityRepository,
        @InjectRepository(DocuemntSevenTableRepository)
        private docuemntSevenTableRepo: DocuemntSevenTableRepository
    ) {

    }

    async createDocument(
        createDocumentSevenDto: CreateDocumentSevenDto
    ) {
        const advisor = await this.authorityRepo.findOne({ where: { id_authority: createDocumentSevenDto.advisor_id } });
        if (!advisor) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const mastersubject = await this.authorityRepo.findOne({ where: { id_authority: createDocumentSevenDto.mastersubject_id } })
        if (!mastersubject) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const head_service_or_deanoffice = await this.authorityRepo.findOne({ where: { id_authority: createDocumentSevenDto.head_service_or_deanoffice_id } })
        if (!head_service_or_deanoffice) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const deputy_dean_research = await this.authorityRepo.findOne({ where: { id_authority: createDocumentSevenDto.deputy_dean_research_id } })
        if (!deputy_dean_research) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const dean = await this.authorityRepo.findOne({ where: { id_authority: createDocumentSevenDto.dean_id } })
        if (!dean) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const student = await this.studentRepo.createStudent(createDocumentSevenDto);
        const signatureSeven = await this.signatureSevenRepo.createSignature(createDocumentSevenDto, advisor, mastersubject, head_service_or_deanoffice, deputy_dean_research, dean);

        const documentSeven = await this.docTypeSevenRepo.createDocumentSeven(createDocumentSevenDto, signatureSeven);
        await this.docuemntSevenTableRepo.createTableSeven(createDocumentSevenDto, documentSeven)

        return await this.documentRepo.createDocumentTypeSeven(student, documentSeven);
        //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
    }
}
