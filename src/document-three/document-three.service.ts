import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { DocumentTypeThreeRepository } from './document-type-three.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { CreateDocumentThreeDto } from './dto/create-document-three.dto';
import { SignatureThreeRepository } from './signature-three-repository';

@Injectable()
export class DocumentThreeService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepo: DocumentRepository,
        @InjectRepository(StudentRepository)
        private studentRepo: StudentRepository,
        @InjectRepository(DocumentTypeThreeRepository)
        private docTypeThreeRepo: DocumentTypeThreeRepository,
        @InjectRepository(SignatureThreeRepository)
        private signatureThreeRepo: SignatureThreeRepository,
        @InjectRepository(AuthorityRepository)
        private authorityRepo: AuthorityRepository
    ) {

    } async createDocument(
        createDocumentThreeDto: CreateDocumentThreeDto
    ) {
        const advisor = await this.authorityRepo.findOne({ where: { id_authority: createDocumentThreeDto.advisor_id } });
        if (!advisor) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const mastersubject = await this.authorityRepo.findOne({ where: { id_authority: createDocumentThreeDto.mastersubject_id } })
        if (!mastersubject) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const head_service_or_deanoffice = await this.authorityRepo.findOne({ where: { id_authority: createDocumentThreeDto.head_service_or_deanoffice_id } })
        if (!head_service_or_deanoffice) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const deputy_dean_research = await this.authorityRepo.findOne({ where: { id_authority: createDocumentThreeDto.deputy_dean_research_id } })
        if (!deputy_dean_research) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const dean = await this.authorityRepo.findOne({ where: { id_authority: createDocumentThreeDto.dean_id } })
        if (!dean) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const student = await this.studentRepo.createStudent(createDocumentThreeDto);
        const signatureThree = await this.signatureThreeRepo.createSignature(createDocumentThreeDto, advisor, mastersubject, head_service_or_deanoffice, deputy_dean_research, dean);
        const documentThree = await this.docTypeThreeRepo.createDocumentThree(createDocumentThreeDto, signatureThree);
        return await this.documentRepo.createDocumentTypeThree(student, documentThree);
        //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
    }
}
