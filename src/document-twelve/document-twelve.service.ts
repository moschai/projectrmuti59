import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { DocumentTypeTwelveRepository } from './document-type-twelve.repository';
import { SignatureTwelveRepository } from './signature-twelve.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { CreateDocumentTwelveDto } from './dto/create-document-twelve.dto';
import { fte_signature_twelve } from './signature-twelve.entity';

@Injectable()
export class DocumentTwelveService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepo: DocumentRepository,
        @InjectRepository(StudentRepository)
        private studentRepo: StudentRepository,
        @InjectRepository(DocumentTypeTwelveRepository)
        private docTypeTwelveRepo: DocumentTypeTwelveRepository,
        @InjectRepository(SignatureTwelveRepository)
        private signatureTwelveRepo: SignatureTwelveRepository,
        @InjectRepository(AuthorityRepository)
        private authorityRepo: AuthorityRepository
    ) {

    }
    async createDocument(
        createDocumentTwelveDto: CreateDocumentTwelveDto
    ) {
        const advisor = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTwelveDto.advisor_id } });
        if (!advisor) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const mastersubject = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTwelveDto.mastersubject_id } })
        if (!mastersubject) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const head_service_or_deanoffice = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTwelveDto.head_service_or_deanoffice_id } })
        if (!head_service_or_deanoffice) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const deputy_dean_research = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTwelveDto.deputy_dean_research_id } })
        if (!deputy_dean_research) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const dean = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTwelveDto.dean_id } })
        if (!dean) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const student = await this.studentRepo.createStudent(createDocumentTwelveDto);
        const signatureTwelve = await this.signatureTwelveRepo.createSignature(createDocumentTwelveDto, advisor, mastersubject, head_service_or_deanoffice, deputy_dean_research, dean);
        const documentTwelve = await this.docTypeTwelveRepo.createDocumentTwelve(createDocumentTwelveDto, signatureTwelve);
        return await this.documentRepo.createDocumentTypeTwelve(student, documentTwelve);
        //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
    }
}
