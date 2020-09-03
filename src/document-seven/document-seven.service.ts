import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { DocumentRepository } from "src/document/document.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeSevenRepository } from "./document-type-seven.repository";
import { SignatureSevenRepository } from "./signature-seven.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentSevenDto } from "./dto/create-document-seven.dto";
import { DocumentSevenTableRepository } from "./document-seven-table.repository";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { fte_authority } from "src/authority/authority.entity";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

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
    @InjectRepository(DocumentSevenTableRepository)
    private documentSevenTableRepo: DocumentSevenTableRepository
  ) {}

  async createDocument(createDocumentSevenDto: CreateDocumentSevenDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentSevenDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }

    const student = await this.studentRepo.createStudent(
      createDocumentSevenDto
    );
    const signatureSeven = await this.signatureSevenRepo.createSignature(
      createDocumentSevenDto,
      advisor
    );

    const documentSeven = await this.docTypeSevenRepo.createDocumentSeven(
      createDocumentSevenDto,
      signatureSeven
    );
    await this.documentSevenTableRepo.createTableSeven(
      createDocumentSevenDto,
      documentSeven
    );

    return await this.documentRepo.createDocumentTypeSeven(
      student,
      documentSeven
    );
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }

  async getDocumentSevenByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_seven"],
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
    const document = await this.getDocumentSevenByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_seven.signature.advisor_id.id_authority !==
        authority.id_authority
      ) {
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.type_seven.signature.advisor_status_sig =
        SignatureStatus.approved;
      document.type_seven.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_seven.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_seven.signature.advisor_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_seven.signature.save();
    return await document.save();
  }

  async getTablesSevenForAuthority(authority: fte_authority) {
    return await this.documentSevenTableRepo.find({
      where: { advisor: authority, is_success: false },
      relations: ["type", "type.document"],
    });
  }

  async autorityApprovedTableSeven(
    authority: fte_authority,
    tableId: number,
    authorityApprovedDto: AuthorityApprovedDto
  ) {
    const table = await this.documentSevenTableRepo.findOne({
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
    const approvedAll = await this.documentSevenTableRepo.find({
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

  async getTableSevenById(tableId: number) {
    const table = await this.documentSevenTableRepo.findOne({
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
