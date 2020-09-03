import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentRepository } from "./document.repository";
import { StudentRepository } from "src/student/student.repository";
import { fte_document } from "./document.entity";
import { fte_student } from "src/student/student.entity";
import { SubjectRepository } from "src/subject/subject.repository";
// import { DocumentSignatureRepository } from './document-signature.repository';
import { DocumentTypeOneRepository } from "src/document-one/document-type-one.repository";
import { fte_authority } from "src/authority/authority.entity";
import { fte_admin } from "src/admin/admin.entity";

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepository: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepository: StudentRepository,
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository
  ) {}

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
    return await this.documentRepository.find({
      take: 10,
      order: { id: "DESC" },
    });
  }

  async getDocumentForAuthority(authority: fte_authority) {
    return await this.documentRepository.find({
      relations: ["student"],
      where: {
        nextSignature: authority,
      },
    });
  }

  async getDocumentForAdmin(admin: fte_admin) {
    return await this.documentRepository.find({
      relations: ["student"],
    });
  }

  async getDocumentById(id) {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException("ไม่มีรหัสคำร้องในระบบ");
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
    if (!document) {
      throw new NotFoundException("ไม่พบแบบคำร้อง");
    }
    await document.remove();
    await document.student.remove();
    return true;
  }

  async getDocumentByStudent(documentId: number, studentId: string) {
    const document = await this.documentRepository.findOne({
      where: { id: documentId },
      relations: ["student"],
    });
    if (!document) {
      throw new NotFoundException("ไม่มีรหัสใบคำร้องในระบบ");
    }
    if (document.student.id_std !== studentId) {
      throw new NotFoundException("ไม่มีรหัสนักศึกษานี้ในใบคำร้อง");
    }

    if (document.type_document === 1) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_one", "student"],
      });
    }

    if (document.type_document === 2) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_two", "student"],
      });
    }

    if (document.type_document === 3) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_three", "student"],
      });
    }

    if (document.type_document === 4) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_four", "student"],
      });
    }

    if (document.type_document === 5) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_five", "student"],
      });
    }

    if (document.type_document === 6) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_six", "student"],
      });
    }

    if (document.type_document === 7) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_seven", "student"],
      });
    }

    if (document.type_document === 8) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_eight", "student"],
      });
    }

    if (document.type_document === 9) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_nine", "student"],
      });
    }

    if (document.type_document === 10) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_ten", "student"],
      });
    }

    if (document.type_document === 11) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_eleven", "student"],
      });
    }

    if (document.type_document === 12) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_twelve", "student"],
      });
    }

    if (document.type_document === 13) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_thirteen", "student"],
      });
    }

    if (document.type_document === 14) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_fourteen", "student"],
      });
    }
    if (document.type_document === 15) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_fifteen", "student"],
      });
    }

    if (document.type_document === 16) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_sixteen", "student"],
      });
    }

    if (document.type_document === 17) {
      return await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ["type_seventeen", "student"],
      });
    }
  }
}
