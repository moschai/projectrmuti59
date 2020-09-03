import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeTwelveRepository } from "./document-type-twelve.repository";
import { SignatureTwelveRepository } from "./signature-twelve.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentTwelveDto } from "./dto/create-document-twelve.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { fte_authority } from "src/authority/authority.entity";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

@Injectable()
export class DocumentTwelveService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeTwelveRepository)
    private docTypeTwelveRepo: DocumentTypeTwelveRepository,
    @InjectRepository(SignatureTwelveRepository)
    private signatureTwelveRepo: SignatureTwelveRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository
  ) {}
  async createDocument(createDocumentTwelveDto: CreateDocumentTwelveDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentTwelveDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentTwelveDto.mastersubject_id },
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
    const student = await this.studentRepo.createStudent(
      createDocumentTwelveDto
    );
    const signatureTwelve = await this.signatureTwelveRepo.createSignature(
      createDocumentTwelveDto,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      deputy_dean_research,
      dean
    );
    const documentTwelve = await this.docTypeTwelveRepo.createDocumentTwelve(
      createDocumentTwelveDto,
      signatureTwelve
    );
    return await this.documentRepo.createDocumentTypeTwelve(
      student,
      documentTwelve
    );
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }

  async getDocumentTwelveByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_twelve"],
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
    const document = await this.getDocumentTwelveByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_twelve.signature.advisor_id.id_authority !==
        authority.id_authority
      ) {
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.number_sig = 2;
      document.nextSignature = document.type_twelve.signature.mastersubject_id;
      document.type_twelve.signature.advisor_status_sig =
        SignatureStatus.approved;
      document.type_twelve.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_twelve.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_twelve.signature.advisor_time = new Date();
    }
    if (documentCheck.number_sig === 2) {
      document.number_sig = 3;
      document.nextSignature =
        document.type_twelve.signature.head_service_or_deanoffice_id;
      document.type_twelve.signature.mastersubject_status_sig =
        SignatureStatus.approved;
      document.type_twelve.signature.mastersubject_path_sig =
        authorityApprovedDto.filename;
      document.type_twelve.signature.mastersubject_comment =
        authorityApprovedDto.comment;
      document.type_twelve.signature.mastersubject_time = new Date();
    }
    if (documentCheck.number_sig === 3) {
      document.number_sig = 4;
      document.nextSignature =
        document.type_twelve.signature.deputy_dean_research_id;
      document.type_twelve.signature.head_service_or_deanoffice_status_sig =
        SignatureStatus.approved;
      document.type_twelve.signature.head_service_or_deanoffice_path_sig =
        authorityApprovedDto.filename;
      document.type_twelve.signature.head_service_or_deanoffice_comment =
        authorityApprovedDto.comment;
      document.type_twelve.signature.head_service_or_deanoffice_time = new Date();
    }
    if (documentCheck.number_sig === 4) {
      document.number_sig = 5;
      document.nextSignature = document.type_twelve.signature.dean_id;
      document.type_twelve.signature.deputy_dean_research_status_sig =
        SignatureStatus.approved;
      document.type_twelve.signature.deputy_dean_research_path_sig =
        authorityApprovedDto.filename;
      document.type_twelve.signature.deputy_dean_research_comment =
        authorityApprovedDto.comment;
      document.type_twelve.signature.deputy_dean_research_time = new Date();
    }
    if (documentCheck.number_sig === 5) {
      document.type_twelve.signature.dean_status_sig = SignatureStatus.approved;
      document.type_twelve.signature.dean_path_sig =
        authorityApprovedDto.filename;
      document.type_twelve.signature.dean_comment =
        authorityApprovedDto.comment;
      document.type_twelve.signature.dean_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_twelve.signature.save();
    return await document.save();
  }
}
