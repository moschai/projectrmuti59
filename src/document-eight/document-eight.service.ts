import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeEightRepository } from "./document-type-eight.reposity";
import { SignatureEightRepository } from "./signature-eight.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { DocumentEightTableRepository } from "./document-eight-table.repository";
import { CreateDocumentEightDto } from "./dto/create-document-eight.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { fte_authority } from "src/authority/authority.entity";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

@Injectable()
export class DocumentEightService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeEightRepository)
    private docTypeEightRepo: DocumentTypeEightRepository,
    @InjectRepository(SignatureEightRepository)
    private signatureEightRepo: SignatureEightRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository,
    @InjectRepository(DocumentEightTableRepository)
    private documentEightTableRepo: DocumentEightTableRepository
  ) {}

  async createDocument(createDocumentEightDto: CreateDocumentEightDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentEightDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }

    const advisornew = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentEightDto.advisornew_id },
    });
    if (!advisornew) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }

    const student = await this.studentRepo.createStudent(
      createDocumentEightDto
    );
    const signatureEight = await this.signatureEightRepo.createSignature(
      createDocumentEightDto,
      advisor,
      advisornew
    );
    const documentEight = await this.docTypeEightRepo.createDocumentEight(
      createDocumentEightDto,
      signatureEight
    );
    await this.documentEightTableRepo.createTableEight(
      createDocumentEightDto,
      documentEight
    );

    return await this.documentRepo.createDocumentTypeEight(
      student,
      documentEight
    );
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }
  async getDocumentEightByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_eight"],
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
    const document = await this.getDocumentEightByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_eight.signature.advisor_id.id_authority !==
        authority.id_authority
      ) {
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.number_sig = 2;
      document.nextSignature = document.type_eight.signature.advisornew_id;
      document.type_eight.signature.advisor_status_sig =
        SignatureStatus.approved;
      document.type_eight.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_eight.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_eight.signature.advisor_time = new Date();
    }
    if (documentCheck.number_sig === 2) {
      document.type_eight.signature.advisornew_status_sig =
        SignatureStatus.approved;
      document.type_eight.signature.advisornew_path_sig =
        authorityApprovedDto.filename;
      document.type_eight.signature.advisornew_comment =
        authorityApprovedDto.comment;
      document.type_eight.signature.advisornew_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_eight.signature.save();
    return await document.save();
  }

  async getTablesEightForAuthority(authority: fte_authority) {
    return await this.documentEightTableRepo.find({
      where: [
        { advisor: authority, is_success: false },
        {
          advisornew: authority,
          is_successlast: false,
        },
      ],

      relations: ["type", "type.document"],
    });
  }

  async autorityApprovedTableEight(
    authority: fte_authority,
    tableId: number,
    authorityApprovedDto: AuthorityApprovedDto
  ) {
    const table = await this.documentEightTableRepo.findOne({
      relations: ["type", "type.document"],
      where: [
        {
          advisor: authority,
          idtable: tableId,
        },
        {
          advisornew: authority,
          idtable: tableId,
        },
      ],
    });
    if (!table) {
      throw new NotFoundException("ไม่พบการอนุมัติ");
    }
    if (authority.id_authority === table.advisor.id_authority) {
      table.is_success = true;
      table.path_signature = authorityApprovedDto.filename;
    } else {
      table.is_successlast = true;
      table.path_signaturelast = authorityApprovedDto.filename;
    }

    await table.save();
    const approvedAll = await this.documentEightTableRepo.find({
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

  async getTableEightById(tableId: number) {
    const table = await this.documentEightTableRepo.findOne({
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
