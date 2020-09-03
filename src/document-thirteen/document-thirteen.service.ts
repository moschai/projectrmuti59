import { Injectable, NotFoundException } from "@nestjs/common";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeThirteenRepository } from "./document-type-thirteen.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentThirteenDto } from "./dto/create-document-thirteen.dto";

@Injectable()
export class DocumentThirteenService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeThirteenRepository)
    private docTypeThirteenRepo: DocumentTypeThirteenRepository
  ) {}
  async createDocument(createDocumentThirteenDto: CreateDocumentThirteenDto) {
    // const studentt = await this.authorityRepo.findOne({
    //   where: { id_authority: createDocumentThirteenDto.studentt_id },
    // });
    // if (!studentt) {
    //   throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    // }
    const student = await this.studentRepo.createStudent(
      createDocumentThirteenDto
    );

    const documentSixteen = await this.docTypeThirteenRepo.createDocumentThirteen(
      createDocumentThirteenDto
    );
    return await this.documentRepo.createDocumentTypeThirteen(
      student,
      documentSixteen
    );
  }

  async getDocumentThirteenByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_thirteen"],
      where: { id: documentId },
    });
    if (!document) {
      throw new NotFoundException("document not found");
    }
    return document;
  }
}
