import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeTenRepository } from "./document-type-ten.repository";
import { SignatureTenRepository } from "./signature-ten.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { DocumentTenTableRepository } from "./document-ten-table.repository";
import { CreateDocumentTenDto } from "./dto/create-document-ten.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { fte_authority } from "src/authority/authority.entity";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

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
    @InjectRepository(DocumentTenTableRepository)
    private documentTenTableRepo: DocumentTenTableRepository
  ) {}

  async createDocument(createDocumentTenDto: CreateDocumentTenDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentTenDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentTenDto.mastersubject_id },
    });
    if (!mastersubject) {
      throw new NotFoundException("รหัสหัวหน้าสาขาวิชาไม่ถูกต้อง");
    }
    const boardsubjectone = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.boardsubjectone },
    });
    if (!boardsubjectone) {
      throw new NotFoundException("1");
    }
    const boardsubjecttwo = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.boardsubjecttwo },
    });
    if (!boardsubjectone) {
      throw new NotFoundException("2");
    }
    const boardsubjectthree = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.boardsubjectthree },
    });
    if (!boardsubjectone) {
      throw new NotFoundException("3");
    }

    const boardsubjectfour = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.boardsubjectfour },
    });
    if (!boardsubjectone) {
      throw new NotFoundException("4");
    }

    const head_service_or_deanoffice = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.headServiceDeanoffice },
    });
    if (!head_service_or_deanoffice) {
      throw new NotFoundException("5");
    }
    const deputy_dean_research = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.deputyDeanResearch },
    });
    if (!deputy_dean_research) {
      throw new NotFoundException("6");
    }

    const dean = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.dean },
    });
    if (!dean) {
      throw new NotFoundException("7");
    }
    const student = await this.studentRepo.createStudent(createDocumentTenDto);
    const signatureTen = await this.signatureTenRepo.createSignature(
      createDocumentTenDto,
      boardsubjectone,
      boardsubjecttwo,
      boardsubjectthree,
      boardsubjectfour,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      deputy_dean_research,
      dean
    );
    const documentTen = await this.docTypeTenRepo.createDocumentTen(
      createDocumentTenDto,
      signatureTen
    );
    await this.documentTenTableRepo.createTableTen(
      createDocumentTenDto,
      documentTen
    );

    return await this.documentRepo.createDocumentTypeTen(student, documentTen);
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }
  async getDocumentTenByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_ten"],
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
    const document = await this.getDocumentTenByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_ten.signature.boardsubjectone_id.id_authority !==
        authority.id_authority
      ) {
        console.log(document.type_ten.signature, authority);
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.number_sig = 2;
      document.nextSignature = document.type_ten.signature.boardsubjecttwo_id;
      document.type_ten.signature.boardsubjectone_status_sig =
        SignatureStatus.approved;
      document.type_ten.signature.boardsubjectone_path_sig =
        authorityApprovedDto.filename;
      document.type_ten.signature.boardsubjectone_time = new Date();
    }
    if (documentCheck.number_sig === 2) {
      document.number_sig = 3;
      document.nextSignature = document.type_ten.signature.boardsubjectthree_id;
      document.type_ten.signature.boardsubjecttwo_status_sig =
        SignatureStatus.approved;
      document.type_ten.signature.boardsubjecttwo_path_sig =
        authorityApprovedDto.filename;
      document.type_ten.signature.boardsubjectwo_time = new Date();
    }

    if (documentCheck.number_sig === 3) {
      document.number_sig = 4;
      document.nextSignature = document.type_ten.signature.boardsubjectfour_id;
      document.type_ten.signature.boardsubjectthree_status_sig =
        SignatureStatus.approved;
      document.type_ten.signature.boardsubjectthree_path_sig =
        authorityApprovedDto.filename;
      document.type_ten.signature.boardsubjectthree_time = new Date();
    }

    if (documentCheck.number_sig === 4) {
      document.number_sig = 5;
      document.nextSignature = document.type_ten.signature.advisor_id;
      document.type_ten.signature.boardsubjectfour_status_sig =
        SignatureStatus.approved;
      document.type_ten.signature.boardsubjectfour_path_sig =
        authorityApprovedDto.filename;
      document.type_ten.signature.boardsubjectfour_time = new Date();
    }

    if (documentCheck.number_sig === 5) {
      document.number_sig = 6;
      document.nextSignature = document.type_ten.signature.mastersubject_id;
      document.type_ten.signature.advisor_status_sig = SignatureStatus.approved;
      document.type_ten.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_ten.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_ten.signature.advisor_time = new Date();
    }
    if (documentCheck.number_sig === 6) {
      document.number_sig = 7;
      document.nextSignature =
        document.type_ten.signature.head_service_or_deanoffice_id;
      document.type_ten.signature.mastersubject_status_sig =
        SignatureStatus.approved;
      document.type_ten.signature.mastersubject_path_sig =
        authorityApprovedDto.filename;
      document.type_ten.signature.mastersubject_comment =
        authorityApprovedDto.comment;
      document.type_ten.signature.mastersubject_time = new Date();
    }

    if (documentCheck.number_sig === 7) {
      document.number_sig = 8;
      document.nextSignature =
        document.type_ten.signature.deputy_dean_research_id;
      if (authorityApprovedDto.notApproved) {
        document.type_ten.signature.deputy_dean_research_status_sig =
          SignatureStatus.notApproved;
      } else {
        document.type_ten.signature.deputy_dean_research_status_sig =
          SignatureStatus.approved;
      }
      document.type_ten.signature.head_service_or_deanoffice_path_sig =
        authorityApprovedDto.filename;
      document.type_ten.signature.head_service_or_deanoffice_comment =
        authorityApprovedDto.comment;
      document.type_ten.signature.head_service_or_deanoffice_time = new Date();
    }

    if (documentCheck.number_sig === 8) {
      document.number_sig = 9;
      document.nextSignature = document.type_ten.signature.dean_id;
      document.type_ten.signature.deputy_dean_research_status_sig =
        SignatureStatus.approved;
      document.type_ten.signature.deputy_dean_research_path_sig =
        authorityApprovedDto.filename;
      document.type_ten.signature.deputy_dean_research_time = new Date();
    }
    if (documentCheck.number_sig === 9) {
      if (authorityApprovedDto.notApproved) {
        document.type_ten.signature.dean_status_sig =
          SignatureStatus.notApproved;
      } else {
        document.type_ten.signature.dean_status_sig = SignatureStatus.approved;
      }
      document.type_ten.signature.dean_path_sig = authorityApprovedDto.filename;
      document.type_ten.signature.dean_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_ten.signature.save();
    return await document.save();
  }

  async getTablesTenForAuthority(authority: fte_authority) {
    return await this.documentTenTableRepo.find({
      where: { advisor: authority, is_success: false },
      relations: ["type", "type.document"],
    });
  }

  async autorityApprovedTableTen(
    authority: fte_authority,
    tableId: number,
    authorityApprovedDto: AuthorityApprovedDto
  ) {
    const table = await this.documentTenTableRepo.findOne({
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
    const approvedAll = await this.documentTenTableRepo.find({
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

  async getTableTenById(tableId: number) {
    const table = await this.documentTenTableRepo.findOne({
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
