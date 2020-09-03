import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeOneRepository } from "./document-type-one.repository";
import { SignatureOneRepository } from "./signature-one.repository";
import { CreateDocumentOneDto } from "./dto/create-document-one.dto";
import { AuthorityRepository } from "src/authority/authority.repository";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { fte_authority } from "src/authority/authority.entity";
import { AuthorityApprovedDto } from "./dto/authority-approved.dto";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

@Injectable()
export class DocumentOneService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeOneRepository)
    private docTypeOneRepo: DocumentTypeOneRepository,
    @InjectRepository(SignatureOneRepository)
    private signatureOneRepo: SignatureOneRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository
  ) {}

  async createDocument(createDocumentOneDto: CreateDocumentOneDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentOneDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentOneDto.mastersubject_id },
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
    const student = await this.studentRepo.createStudent(createDocumentOneDto);
    const signatureOne = await this.signatureOneRepo.createSignature(
      createDocumentOneDto,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      deputy_dean_research,
      dean
    );
    const documentOne = await this.docTypeOneRepo.createDocumentOne(
      createDocumentOneDto,
      signatureOne
    );
    return await this.documentRepo.createDocumentTypeOne(student, documentOne);
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }

  async getDocumentOneByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_one"],
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
    const document = await this.getDocumentOneByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_one.signature.advisor_id.id_authority !==
        authority.id_authority
      ) {
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.number_sig = 2;
      document.nextSignature = document.type_one.signature.mastersubject_id;
      document.type_one.signature.advisor_status_sig = SignatureStatus.approved;
      document.type_one.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_one.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_one.signature.advisor_time = new Date();
    }
    if (documentCheck.number_sig === 2) {
      document.number_sig = 3;
      document.nextSignature =
        document.type_one.signature.head_service_or_deanoffice_id;
      document.type_one.signature.mastersubject_status_sig =
        SignatureStatus.approved;
      document.type_one.signature.mastersubject_path_sig =
        authorityApprovedDto.filename;
      document.type_one.signature.mastersubject_comment =
        authorityApprovedDto.comment;
      document.type_one.signature.mastersubject_time = new Date();
    }
    if (documentCheck.number_sig === 3) {
      document.number_sig = 4;
      document.nextSignature =
        document.type_one.signature.deputy_dean_research_id;
      document.type_one.signature.head_service_or_deanoffice_status_sig =
        SignatureStatus.approved;
      document.type_one.signature.head_service_or_deanoffice_path_sig =
        authorityApprovedDto.filename;
      document.type_one.signature.head_service_or_deanoffice_comment =
        authorityApprovedDto.comment;
      document.type_one.signature.head_service_or_deanoffice_time = new Date();
    }
    if (documentCheck.number_sig === 4) {
      document.number_sig = 5;
      document.nextSignature = document.type_one.signature.dean_id;
      document.type_one.signature.deputy_dean_research_status_sig =
        SignatureStatus.approved;
      document.type_one.signature.deputy_dean_research_path_sig =
        authorityApprovedDto.filename;
      document.type_one.signature.deputy_dean_research_comment =
        authorityApprovedDto.comment;
      document.type_one.signature.deputy_dean_research_time = new Date();
    }
    if (documentCheck.number_sig === 5) {
      document.type_one.signature.dean_status_sig = SignatureStatus.approved;
      document.type_one.signature.dean_path_sig = authorityApprovedDto.filename;
      document.type_one.signature.dean_comment = authorityApprovedDto.comment;
      document.type_one.signature.dean_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_one.signature.save();
    return await document.save();
  }
}
