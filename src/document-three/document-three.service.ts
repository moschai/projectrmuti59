import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeThreeRepository } from "./document-type-three.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentThreeDto } from "./dto/create-document-three.dto";
import { SignatureThreeRepository } from "./signature-three-repository";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { SignatureStatus } from "src/document/enum/signature-status.enum";
import { fte_authority } from "src/authority/authority.entity";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";

@Injectable()
export class DocumentThreeService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeThreeRepository)
    private docTypeThreeRepo: DocumentTypeThreeRepository,
    @InjectRepository(SignatureThreeRepository)
    private signatureThreeRepo: SignatureThreeRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository
  ) {}
  async createDocument(createDocumentThreeDto: CreateDocumentThreeDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentThreeDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentThreeDto.mastersubject_id },
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
      createDocumentThreeDto
    );
    const signatureThree = await this.signatureThreeRepo.createSignature(
      createDocumentThreeDto,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      deputy_dean_research,
      dean
    );
    const documentThree = await this.docTypeThreeRepo.createDocumentThree(
      createDocumentThreeDto,
      signatureThree
    );
    return await this.documentRepo.createDocumentTypeThree(
      student,
      documentThree
    );
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }

  async getDocumentThreeByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_three"],
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
    const document = await this.getDocumentThreeByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_three.signature.advisor_id.id_authority !==
        authority.id_authority
      ) {
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.number_sig = 2;
      document.nextSignature = document.type_three.signature.mastersubject_id;
      document.type_three.signature.advisor_status_sig =
        SignatureStatus.approved;
      document.type_three.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_three.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_three.signature.advisor_time = new Date();
    }
    if (documentCheck.number_sig === 2) {
      document.number_sig = 3;
      document.nextSignature =
        document.type_three.signature.head_service_or_deanoffice_id;
      document.type_three.signature.mastersubject_status_sig =
        SignatureStatus.approved;
      document.type_three.signature.mastersubject_path_sig =
        authorityApprovedDto.filename;
      document.type_three.signature.mastersubject_comment =
        authorityApprovedDto.comment;
      document.type_three.signature.mastersubject_time = new Date();
    }
    if (documentCheck.number_sig === 3) {
      document.number_sig = 4;
      document.nextSignature =
        document.type_three.signature.deputy_dean_research_id;
      document.type_three.signature.head_service_or_deanoffice_status_sig =
        SignatureStatus.approved;
      document.type_three.signature.head_service_or_deanoffice_path_sig =
        authorityApprovedDto.filename;
      document.type_three.signature.head_service_or_deanoffice_comment =
        authorityApprovedDto.comment;
      document.type_three.signature.head_service_or_deanoffice_time = new Date();
    }
    if (documentCheck.number_sig === 4) {
      document.number_sig = 5;
      document.nextSignature = document.type_three.signature.dean_id;
      document.type_three.signature.deputy_dean_research_status_sig =
        SignatureStatus.approved;
      document.type_three.signature.deputy_dean_research_path_sig =
        authorityApprovedDto.filename;
      document.type_three.signature.deputy_dean_research_comment =
        authorityApprovedDto.comment;
      document.type_three.signature.deputy_dean_research_time = new Date();
    }
    if (documentCheck.number_sig === 5) {
      document.type_three.signature.dean_status_sig = SignatureStatus.approved;
      document.type_three.signature.dean_path_sig =
        authorityApprovedDto.filename;
      document.type_three.signature.dean_comment = authorityApprovedDto.comment;
      document.type_three.signature.dean_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_three.signature.save();
    return await document.save();
  }
}
