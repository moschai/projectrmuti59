import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeSeventeenRepository } from "./document-type-seventeen.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { SignatureSeventeenRepository } from "./signature-seventeen.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { DocumentSeventeenTableRepository } from "./document-seventeen-table.repository";
import { CreateDocumentSeventeenDto } from "./dto/create-document-seventeen.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { SignatureStatus } from "src/document/enum/signature-status.enum";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { fte_authority } from "src/authority/authority.entity";

@Injectable()
export class DocumentSeventeenService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeSeventeenRepository)
    private docTypeSeventeenRepo: DocumentTypeSeventeenRepository,
    @InjectRepository(SignatureSeventeenRepository)
    private signatureSeventeenRepo: SignatureSeventeenRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository,
    @InjectRepository(DocumentSeventeenTableRepository)
    private docementSeventeenTableRepo: DocumentSeventeenTableRepository
  ) {}

  async createDocument(createDocumentSeventeenDto: CreateDocumentSeventeenDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentSeventeenDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }

    const student = await this.studentRepo.createStudent(
      createDocumentSeventeenDto
    );
    const signatureSeventeen = await this.signatureSeventeenRepo.createSignature(
      createDocumentSeventeenDto,
      advisor
    );

    const documentSeventeen = await this.docTypeSeventeenRepo.createDocumentSeventeen(
      createDocumentSeventeenDto,
      signatureSeventeen
    );
    await this.docementSeventeenTableRepo.createTableSeventeen(
      createDocumentSeventeenDto,
      documentSeventeen
    );

    return await this.documentRepo.createDocumentTypeSeventeen(
      student,
      documentSeventeen
    );
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }

  async getDocumentSeventeenByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_seventeen"],
      where: { id: documentId },
    });
    if (!document) {
      throw new NotFoundException("document not found");
    }
    return document;
  }

  async authorityApproved(
    documentId: number,
    authority: fte_authority,
    authorityApprovedDto: AuthorityApprovedDto
  ) {
    const document = await this.getDocumentSeventeenByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_seventeen.signature.advisor_id.id_authority !==
        authority.id_authority
      ) {
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.type_seventeen.signature.advisor_status_sig =
        SignatureStatus.approved;
      document.type_seventeen.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_seventeen.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_seventeen.signature.advisor_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_seventeen.signature.save();
    return await document.save();
  }

  async getTablesSeventeenForAuthority(authority: fte_authority) {
    return await this.docementSeventeenTableRepo.find({
      where: { advisor: authority, is_success: false },
      relations: ["type", "type.document"],
    });
  }

  async autorityApprovedTableSeventeen(
    authority: fte_authority,
    tableId: number,
    authorityApprovedDto: AuthorityApprovedDto
  ) {
    const table = await this.docementSeventeenTableRepo.findOne({
      relations: ["type", "type.document"],
      where: {
        advisor: authority,
        idtable: tableId,
      },
    });
    if (!table) {
      throw new NotFoundException("ไม่พบการอนุมัติ");
    }
    table.is_success = true;
    table.path_signature = authorityApprovedDto.filename;
    await table.save();
    const approvedAll = await this.docementSeventeenTableRepo.find({
      where: {
        type: table.type,
        is_success: false,
      },
    });

    if (!approvedAll.length) {
      const document = table.type.document;
      document.isAllTableSignature = true;
      await document.save();
    }
    return table;
  }

  async getTableSeventeenById(tableId: number) {
    const table = await this.docementSeventeenTableRepo.findOne({
      relations: ["type", "type.document"],
      where: {
        idtable: tableId,
      },
    });

    if (!table) {
      throw new NotFoundException("table not found");
    }
    return table;
  }
}
