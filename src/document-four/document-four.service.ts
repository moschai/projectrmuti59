import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { SignatureFourRepository } from "./signature-four.repository";
import { DocumentTypeFourRepository } from "./document-type-four.repository";
import { CreateDocumentFourDto } from "./dto/create-document-four.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { SignatureStatus } from "src/document/enum/signature-status.enum";
import { fte_authority } from "src/authority/authority.entity";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";

@Injectable()
export class DocumentFourService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeFourRepository)
    private docTypeFourRepo: DocumentTypeFourRepository,
    @InjectRepository(SignatureFourRepository)
    private signatureFourRepo: SignatureFourRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository
  ) {}
  async createDocument(createDocumentFourDto: CreateDocumentFourDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentFourDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentFourDto.mastersubject_id },
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
    const student = await this.studentRepo.createStudent(createDocumentFourDto);
    const signatureFour = await this.signatureFourRepo.createSignature(
      createDocumentFourDto,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      deputy_dean_research,
      dean
    );
    const documentFour = await this.docTypeFourRepo.createDocumentFour(
      createDocumentFourDto,
      signatureFour
    );
    return await this.documentRepo.createDocumentTypeFour(
      student,
      documentFour
    );
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }

  async getDocumentFourByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_four"],
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
    const document = await this.getDocumentFourByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_four.signature.advisor_id.id_authority !==
        authority.id_authority
      ) {
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.number_sig = 2;
      document.nextSignature = document.type_four.signature.mastersubject_id;
      document.type_four.signature.advisor_status_sig =
        SignatureStatus.approved;
      document.type_four.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_four.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_four.signature.advisor_time = new Date();
    }
    if (documentCheck.number_sig === 2) {
      document.number_sig = 3;
      document.nextSignature =
        document.type_four.signature.head_service_or_deanoffice_id;
      document.type_four.signature.mastersubject_status_sig =
        SignatureStatus.approved;
      document.type_four.signature.mastersubject_path_sig =
        authorityApprovedDto.filename;
      document.type_four.signature.mastersubject_comment =
        authorityApprovedDto.comment;
      document.type_four.signature.mastersubject_time = new Date();
    }
    if (documentCheck.number_sig === 3) {
      document.number_sig = 4;
      document.nextSignature =
        document.type_four.signature.deputy_dean_research_id;
      document.type_four.signature.head_service_or_deanoffice_status_sig =
        SignatureStatus.approved;
      document.type_four.signature.head_service_or_deanoffice_path_sig =
        authorityApprovedDto.filename;
      document.type_four.signature.selectcondition =
        authorityApprovedDto.selectcondition;
      document.type_four.signature.othercondition =
        authorityApprovedDto.othercondition;
      document.type_four.signature.otherapprove =
        authorityApprovedDto.otherapprove;

      document.type_four.signature.head_service_or_deanoffice_time = new Date();
    }
    if (documentCheck.number_sig === 4) {
      document.number_sig = 5;
      document.nextSignature = document.type_four.signature.dean_id;
      document.type_four.signature.deputy_dean_research_status_sig =
        SignatureStatus.approved;
      document.type_four.signature.deputy_dean_research_path_sig =
        authorityApprovedDto.filename;
      document.type_four.signature.deputy_dean_research_comment =
        authorityApprovedDto.comment;
      document.type_four.signature.deputy_dean_research_time = new Date();
    }
    if (documentCheck.number_sig === 5) {
      if (authorityApprovedDto.notApproved) {
        document.type_four.signature.dean_status_sig =
          SignatureStatus.notApproved;
      } else {
        document.type_four.signature.dean_status_sig = SignatureStatus.approved;
      }

      document.type_four.signature.dean_path_sig =
        authorityApprovedDto.filename;

      document.type_four.signature.dean_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_four.signature.save();
    return await document.save();
  }
}
