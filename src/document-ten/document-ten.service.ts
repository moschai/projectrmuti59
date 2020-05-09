import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentRepository } from 'src/document/document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { DocumentTypeTenRepository } from './document-type-ten.repository';
import { SignatureTenRepository } from './signature-ten.repository';
import { AuthorityRepository } from 'src/authority/authority.repository';
import { DocuemntTenTableRepository } from './document-ten-table.repository';
import { CreateDocumentTenDto } from './dto/create-document-ten.dto';

@Injectable()
export class DocumentTenService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepo: DocumentRepository,
        @InjectRepository(StudentRepository)
        private studentRepo: StudentRepository,
        @InjectRepository(DocumentTypeTenRepository)
        private docTypeTenRepo: DocumentTypeTenRepository,
        @InjectRepository(SignatureTenRepository)
        private signatureTenRepo: SignatureTenRepository,
        @InjectRepository(AuthorityRepository)
        private authorityRepo: AuthorityRepository,
        @InjectRepository(DocuemntTenTableRepository)
        private docuemntTenTableRepo: DocuemntTenTableRepository
    ) {

    }

    async createDocument(
        createDocumentTenDto: CreateDocumentTenDto
    ) {
        const boardsubjectone = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTenDto.boardsubjectone_id } })
        if (!boardsubjectone) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const boardsubjecttwo = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTenDto.boardsubjecttwo_id } })
        if (!boardsubjecttwo) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const boardsubjectthree = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTenDto.boardsubjectthree_id } })
        if (!boardsubjectthree) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const boardsubjectfour = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTenDto.boardsubjectfour_id } })
        if (!boardsubjectfour) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const advisor = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTenDto.advisor_id } });
        if (!advisor) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const mastersubject = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTenDto.mastersubject_id } })
        if (!mastersubject) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const head_service_or_deanoffice = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTenDto.head_service_or_deanoffice_id } })
        if (!head_service_or_deanoffice) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const dean = await this.authorityRepo.findOne({ where: { id_authority: createDocumentTenDto.dean_id } })
        if (!dean) {
            throw new NotFoundException('รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง')
        }
        const student = await this.studentRepo.createStudent(createDocumentTenDto);
        const signatureTen = await this.signatureTenRepo.createSignature(createDocumentTenDto, boardsubjectone, boardsubjecttwo, boardsubjectthree, boardsubjectfour, advisor, mastersubject, head_service_or_deanoffice, dean);
        const documentTen = await this.docTypeTenRepo.createDocumentTen(createDocumentTenDto, signatureTen);
        await this.docuemntTenTableRepo.createTableTen(createDocumentTenDto, documentTen)

        return await this.documentRepo.createDocumentTypeTen(student, documentTen);
        //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
    }
}
