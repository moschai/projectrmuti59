import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { DocumentTypeNineRepository } from './document-type-nine.repository';
import { SignatureNineRepository } from './signature-nine.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { CreateDocumentNineDto } from './dto/create-document-nine.dto';

@Injectable()
export class DocumentNineService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepo: DocumentRepository,
        @InjectRepository(StudentRepository)
        private studentRepo: StudentRepository,
        @InjectRepository(DocumentTypeNineRepository)
        private docTypeNineRepo: DocumentTypeNineRepository,
        @InjectRepository(SignatureNineRepository)
        private signatureNineRepo: SignatureNineRepository,
        @InjectRepository(AuthorityRepository)
        private authorityRepo: AuthorityRepository
    ) {

    }
    async createDocument(
        createDocumentNineDto: CreateDocumentNineDto
    ) {
        const advisor = await this.authorityRepo.findOne({ where: { id_authority: createDocumentNineDto.advisor_id } });
        if (!advisor) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const mastersubject = await this.authorityRepo.findOne({ where: { id_authority: createDocumentNineDto.mastersubject_id } })
        if (!mastersubject) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const head_service_or_deanoffice = await this.authorityRepo.findOne({ where: { id_authority: createDocumentNineDto.head_service_or_deanoffice_id } })
        if (!head_service_or_deanoffice) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const deputy_dean_research = await this.authorityRepo.findOne({ where: { id_authority: createDocumentNineDto.deputy_dean_research_id } })
        if (!deputy_dean_research) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const dean = await this.authorityRepo.findOne({ where: { id_authority: createDocumentNineDto.dean_id } })
        if (!dean) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const student = await this.studentRepo.createStudent(createDocumentNineDto);
        const signatureNine = await this.signatureNineRepo.createSignature(createDocumentNineDto, advisor, mastersubject, head_service_or_deanoffice, deputy_dean_research, dean);
        const documentNine = await this.docTypeNineRepo.createDocumentNine(createDocumentNineDto, signatureNine);
        return await this.documentRepo.createDocumentTypeNine(student, documentNine);
        //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
    }
}
