import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentTypeFiveRepository } from "./document-type-five.repository";
import { SignatureFiveRepository } from "./signature-five.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentFiveDto } from "./dto/create-document-five.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { fte_authority } from "src/authority/authority.entity";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

@Injectable()
export class DocumentFiveService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeFiveRepository)
    private docTypeFiveRepo: DocumentTypeFiveRepository,
    @InjectRepository(SignatureFiveRepository)
    private signatureFiveRepo: SignatureFiveRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository
  ) {}
  async createDocument(createDocumentFiveDto: CreateDocumentFiveDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentFiveDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentFiveDto.mastersubject_id },
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
    const student = await this.studentRepo.createStudent(createDocumentFiveDto);
    const signatureFive = await this.signatureFiveRepo.createSignature(
      createDocumentFiveDto,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      deputy_dean_research,
      dean
    );
    const documentFive = await this.docTypeFiveRepo.createDocumentFive(
      createDocumentFiveDto,
      signatureFive
    );
    return await this.documentRepo.createDocumentTypeFive(
      student,
      documentFive
    );
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }

  async getDocumentFiveByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_five"],
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
    const document = await this.getDocumentFiveByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_five.signature.advisor_id.id_authority !==
        authority.id_authority
      ) {
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.number_sig = 2;
      document.nextSignature = document.type_five.signature.mastersubject_id;
      document.type_five.signature.advisor_status_sig =
        SignatureStatus.approved;
      document.type_five.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_five.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_five.signature.advisor_time = new Date();
    }
    if (documentCheck.number_sig === 2) {
      document.number_sig = 3;
      document.nextSignature =
        document.type_five.signature.head_service_or_deanoffice_id;
      document.type_five.signature.mastersubject_status_sig =
        SignatureStatus.approved;
      document.type_five.signature.mastersubject_path_sig =
        authorityApprovedDto.filename;
      document.type_five.signature.mastersubject_comment =
        authorityApprovedDto.comment;
      document.type_five.signature.mastersubject_time = new Date();
    }
    if (documentCheck.number_sig === 3) {
      document.number_sig = 4;
      document.nextSignature =
        document.type_five.signature.deputy_dean_research_id;
      document.type_five.signature.head_service_or_deanoffice_status_sig =
        SignatureStatus.approved;
      document.type_five.signature.head_service_or_deanoffice_path_sig =
        authorityApprovedDto.filename;
      document.type_five.signature.selectapprovefive =
        authorityApprovedDto.selectapprovefive;
      document.type_five.signature.otherapprovefive =
        authorityApprovedDto.otherapprovefive;
      document.type_five.signature.otherfivest =
        authorityApprovedDto.otherfivest;
      document.type_five.signature.head_service_or_deanoffice_time = new Date();
    }
    if (documentCheck.number_sig === 4) {
      document.number_sig = 5;
      document.nextSignature = document.type_five.signature.dean_id;
      document.type_five.signature.deputy_dean_research_status_sig =
        SignatureStatus.approved;
      document.type_five.signature.deputy_dean_research_path_sig =
        authorityApprovedDto.filename;
      document.type_five.signature.deputy_dean_research_comment =
        authorityApprovedDto.comment;
      document.type_five.signature.deputy_dean_research_time = new Date();
    }
    if (documentCheck.number_sig === 5) {
      if (authorityApprovedDto.notApproved) {
        document.type_five.signature.dean_status_sig =
          SignatureStatus.notApproved;
      } else {
        document.type_five.signature.dean_status_sig = SignatureStatus.approved;
      }
      document.type_five.signature.dean_path_sig =
        authorityApprovedDto.filename;
      document.type_five.signature.dean_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_five.signature.save();
    return await document.save();
  }
}
