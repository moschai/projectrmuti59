import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeNineRepository } from "./document-type-nine.repository";
import { SignatureNineRepository } from "./signature-nine.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentNineDto } from "./dto/create-document-nine.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { DocumentNineTableRepository } from "./document-nine-table.repository";
import { SignatureStatus } from "src/document/enum/signature-status.enum";
import { fte_authority } from "src/authority/authority.entity";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";

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
    private authorityRepo: AuthorityRepository,
    @InjectRepository(DocumentNineTableRepository)
    private documentNineTableRepo: DocumentNineTableRepository
  ) {}
  async createDocument(createDocumentNineDto: CreateDocumentNineDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentNineDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentNineDto.mastersubject_id },
    });
    if (!mastersubject) {
      throw new NotFoundException("รหัสหัวหน้าสาขาวิชาไม่ถูกต้อง");
    }
    const head_service_or_deanoffice = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.headServiceDeanoffice },
    });
    if (!head_service_or_deanoffice) {
      throw new NotFoundException("1");
    }
    const deputy_dean_research = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.deputyDeanResearch },
    });
    if (!deputy_dean_research) {
      throw new NotFoundException("2");
    }
    const dean = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.dean },
    });
    if (!dean) {
      throw new NotFoundException("3");
    }
    const student = await this.studentRepo.createStudent(createDocumentNineDto);
    const signatureNine = await this.signatureNineRepo.createSignature(
      createDocumentNineDto,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      deputy_dean_research,
      dean
    );
    const documentNine = await this.docTypeNineRepo.createDocumentNine(
      createDocumentNineDto,
      signatureNine
    );
    await this.documentNineTableRepo.createTableNine(
      createDocumentNineDto,
      documentNine
    );
    return await this.documentRepo.createDocumentTypeNine(
      student,
      documentNine
    );
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }

  async getDocumentNineByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_nine"],
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
    const document = await this.getDocumentNineByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_nine.signature.advisor_id.id_authority !==
        authority.id_authority
      ) {
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.number_sig = 2;
      document.nextSignature = document.type_nine.signature.mastersubject_id;
      document.type_nine.signature.advisor_status_sig =
        SignatureStatus.approved;
      document.type_nine.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_nine.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_nine.signature.advisor_time = new Date();
    }
    if (documentCheck.number_sig === 2) {
      document.number_sig = 3;
      document.nextSignature =
        document.type_nine.signature.head_service_or_deanoffice_id;
      document.type_nine.signature.mastersubject_status_sig =
        SignatureStatus.approved;
      document.type_nine.signature.mastersubject_path_sig =
        authorityApprovedDto.filename;
      document.type_nine.signature.mastersubject_comment =
        authorityApprovedDto.comment;
      document.type_nine.signature.mastersubject_time = new Date();
    }
    if (documentCheck.number_sig === 3) {
      document.number_sig = 4;
      document.nextSignature =
        document.type_nine.signature.deputy_dean_research_id;
      document.type_nine.signature.head_service_or_deanoffice_status_sig =
        SignatureStatus.approved;
      document.type_nine.signature.head_service_or_deanoffice_path_sig =
        authorityApprovedDto.filename;
      document.type_nine.signature.head_service_or_deanoffice_comment =
        authorityApprovedDto.comment;
      document.type_nine.signature.head_service_or_deanoffice_time = new Date();
    }
    if (documentCheck.number_sig === 4) {
      document.number_sig = 5;
      document.nextSignature = document.type_nine.signature.dean_id;
      document.type_nine.signature.deputy_dean_research_status_sig =
        SignatureStatus.approved;
      document.type_nine.signature.deputy_dean_research_path_sig =
        authorityApprovedDto.filename;
      document.type_nine.signature.deputy_dean_research_comment =
        authorityApprovedDto.comment;
      document.type_nine.signature.deputy_dean_research_time = new Date();
    }
    if (documentCheck.number_sig === 5) {
      document.type_nine.signature.dean_status_sig = SignatureStatus.approved;
      document.type_nine.signature.dean_path_sig =
        authorityApprovedDto.filename;
      document.type_nine.signature.dean_comment = authorityApprovedDto.comment;
      document.type_nine.signature.dean_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_nine.signature.save();
    return await document.save();
  }

  async getTablesNineForAuthority(authority: fte_authority) {
    return await this.documentNineTableRepo.find({
      where: { advisor: authority, is_success: false },
      relations: ["type", "type.document"],
    });
  }

  async autorityApprovedTableNine(
    authority: fte_authority,
    tableId: number,
    authorityApprovedDto: AuthorityApprovedDto
  ) {
    const table = await this.documentNineTableRepo.findOne({
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
    const approvedAll = await this.documentNineTableRepo.find({
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

  async getTableNineById(tableId: number) {
    const table = await this.documentNineTableRepo.findOne({
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
