import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentRepository } from './document.repository';
import { StudentRepository } from 'src/student/student.repository';
import { fte_document } from './document.entity';
import { fte_student } from 'src/student/student.entity';
import { SubjectRepository } from 'src/student/subject.repository';
// import { DocumentSignatureRepository } from './document-signature.repository';
import { DocumentTypeOneRepository } from 'src/document-one/document-type-one.repository';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(DocumentRepository)
        private documentRepository: DocumentRepository,
        @InjectRepository(StudentRepository)
        private studentRepository: StudentRepository,
        @InjectRepository(SubjectRepository)
        private subjectRepository: SubjectRepository
    ) {
    }

    // async createDocument(
    //     createDocumentDto: any
    // ) {
    //     let subject;
    //     if (createDocumentDto.id_subject) {
    //         subject = await this.subjectRepository.findOne({ id_subject: createDocumentDto.id_subject });
    //         if (!subject) throw new NotFoundException('ไม่พบรหัสรายวิชา')
    //     }

    //     // const lveducation = await this.lveducationRepository.findOne({ id_program: createDocumentDto.id_program });
    //     // if (!lveducation) throw new NotFoundException('ระดับการศึกษาไม่ถูกต้อง');

    //     const student = await this.studentRepository.createStudent(createDocumentDto, subject);

    //     return await this.documentRepository.createDocument(createDocumentDto, student);

    // }

    async getDocumentAll() {
        return await this.documentRepository.find();
    }

    async getDocumentById(id) {
        const document = await this.documentRepository.findOne({ where: { id } })
        if (!document) {
            throw new NotFoundException('ไม่มีรหัสคำร้องในระบบ')
        }

        return document;
    }

    async updateDocumentStatus(updateDocumentStatusDto) {
        const document = await this.getDocumentById(updateDocumentStatusDto.id);
        document.document_pdf = updateDocumentStatusDto.document_pdf;
        document.ststus_doc = 2;
        return await document.save();
    }

    async deleteDocumentById(id) {
        const document = await this.getDocumentById(id);
        //  const signatures = await this.documentSignatureRepository.find({document})
        // await this.documentSignatureRepository.remove(document.signature)
        await document.remove()
        await document.student.remove();
        return true;

    }
}
