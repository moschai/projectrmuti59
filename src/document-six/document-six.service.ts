import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { DocumentRepository } from "src/document/document.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeSixRepository } from "./document-type-six.repository";
import { SignatureSixRepository } from "./signature-six.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentSixDto } from "./dto/create-document-six.dto";
import { DocumentSixTableRepository } from "./document-six-table.repository";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { fte_authority } from "src/authority/authority.entity";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

@Injectable()
export class DocumentSixService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeSixRepository)
    private docTypeSixRepo: DocumentTypeSixRepository,
    @InjectRepository(SignatureSixRepository)
    private signatureSixRepo: SignatureSixRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository,
    @InjectRepository(DocumentSixTableRepository)
    private documentSixTableRepo: DocumentSixTableRepository
  ) {}

  async createDocument(createDocumentSixDto: CreateDocumentSixDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentSixDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentSixDto.mastersubject_id },
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
    const student = await this.studentRepo.createStudent(createDocumentSixDto);
    const signatureSix = await this.signatureSixRepo.createSignature(
      createDocumentSixDto,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      deputy_dean_research,
      dean
    );
    const documentSix = await this.docTypeSixRepo.createDocumentSix(
      createDocumentSixDto,
      signatureSix
    );
    await this.documentSixTableRepo.createTableSix(
      createDocumentSixDto,
      documentSix
    );

    return await this.documentRepo.createDocumentTypeSix(student, documentSix);
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }

  async getDocumentSixByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_six"],
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
    const document = await this.getDocumentSixByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_six.signature.advisor_id.id_authority !==
        authority.id_authority
      ) {
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.number_sig = 2;
      document.nextSignature = document.type_six.signature.mastersubject_id;
      document.type_six.signature.advisor_status_sig = SignatureStatus.approved;
      document.type_six.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_six.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_six.signature.advisor_time = new Date();
    }
    if (documentCheck.number_sig === 2) {
      document.number_sig = 3;
      document.nextSignature =
        document.type_six.signature.head_service_or_deanoffice_id;
      document.type_six.signature.mastersubject_status_sig =
        SignatureStatus.approved;
      document.type_six.signature.mastersubject_path_sig =
        authorityApprovedDto.filename;
      document.type_six.signature.mastersubject_comment =
        authorityApprovedDto.comment;
      document.type_six.signature.mastersubject_time = new Date();
    }
    if (documentCheck.number_sig === 3) {
      document.number_sig = 4;
      document.nextSignature =
        document.type_six.signature.deputy_dean_research_id;
      document.type_six.signature.head_service_or_deanoffice_status_sig =
        SignatureStatus.approved;
      document.type_six.signature.head_service_or_deanoffice_path_sig =
        authorityApprovedDto.filename;
      document.type_six.signature.selectapprovesix =
        authorityApprovedDto.selectapprovesix;
      document.type_six.signature.otherapprovesix =
        authorityApprovedDto.otherapprovesix;
      document.type_six.signature.othersixst = authorityApprovedDto.othersixst;
      document.type_six.signature.head_service_or_deanoffice_time = new Date();
    }
    if (documentCheck.number_sig === 4) {
      document.number_sig = 5;
      document.nextSignature = document.type_six.signature.dean_id;
      document.type_six.signature.deputy_dean_research_status_sig =
        SignatureStatus.approved;
      document.type_six.signature.deputy_dean_research_path_sig =
        authorityApprovedDto.filename;
      document.type_six.signature.deputy_dean_research_comment =
        authorityApprovedDto.comment;
      document.type_six.signature.deputy_dean_research_time = new Date();
    }
    if (documentCheck.number_sig === 5) {
      if (authorityApprovedDto.notApproved) {
        document.type_six.signature.dean_status_sig =
          SignatureStatus.notApproved;
      } else {
        document.type_six.signature.dean_status_sig = SignatureStatus.approved;
      }
      document.type_six.signature.dean_path_sig = authorityApprovedDto.filename;
      document.type_six.signature.dean_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_six.signature.save();
    return await document.save();
  }

  async getTablesSixForAuthority(authority: fte_authority) {
    return await this.documentSixTableRepo.find({
      where: { advisor: authority, is_success: false },
      relations: ["type", "type.document"],
    });
  }

  async autorityApprovedTableSix(
    authority: fte_authority,
    tableId: number,
    authorityApprovedDto: AuthorityApprovedDto
  ) {
    const table = await this.documentSixTableRepo.findOne({
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
    const approvedAll = await this.documentSixTableRepo.find({
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

  async getTableSixById(tableId: number) {
    const table = await this.documentSixTableRepo.findOne({
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
