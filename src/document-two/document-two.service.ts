import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { DocumentRepository } from "src/document/document.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeTwoRepository } from "./document-type-two.repository";
import { SignatureTwoRepository } from "./signature-two.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentTwoDto } from "./dto/create-document-two.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { SignatureStatus } from "src/document/enum/signature-status.enum";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { fte_authority } from "src/authority/authority.entity";

@Injectable()
export class DocumentTwoService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeTwoRepository)
    private docTypeTwoRepo: DocumentTypeTwoRepository,
    @InjectRepository(SignatureTwoRepository)
    private signatureTwoRepo: SignatureTwoRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository
  ) {}
  async createDocument(createDocumentTwoDto: CreateDocumentTwoDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentTwoDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentTwoDto.mastersubject_id },
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
    const student = await this.studentRepo.createStudent(createDocumentTwoDto);
    const signatureTwo = await this.signatureTwoRepo.createSignature(
      createDocumentTwoDto,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      deputy_dean_research,
      dean
    );
    const documentTwo = await this.docTypeTwoRepo.createDocumentTwo(
      createDocumentTwoDto,
      signatureTwo
    );
    return await this.documentRepo.createDocumentTypeTwo(student, documentTwo);
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }

  async getDocumentTwoByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_two"],
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
    const document = await this.getDocumentTwoByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_two.signature.advisor_id.id_authority !==
        authority.id_authority
      ) {
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.number_sig = 2;
      document.nextSignature = document.type_two.signature.mastersubject_id;
      document.type_two.signature.advisor_status_sig = SignatureStatus.approved;
      document.type_two.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_two.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_two.signature.advisor_time = new Date();
    }
    if (documentCheck.number_sig === 2) {
      document.number_sig = 3;
      document.nextSignature =
        document.type_two.signature.head_service_or_deanoffice_id;
      document.type_two.signature.mastersubject_status_sig =
        SignatureStatus.approved;
      document.type_two.signature.mastersubject_path_sig =
        authorityApprovedDto.filename;
      document.type_two.signature.mastersubject_comment =
        authorityApprovedDto.comment;
      document.type_two.signature.mastersubject_time = new Date();
    }
    if (documentCheck.number_sig === 3) {
      document.number_sig = 4;
      document.nextSignature =
        document.type_two.signature.deputy_dean_research_id;
      document.type_two.signature.head_service_or_deanoffice_status_sig =
        SignatureStatus.approved;
      document.type_two.signature.head_service_or_deanoffice_path_sig =
        authorityApprovedDto.filename;
      document.type_two.signature.head_service_or_deanoffice_comment =
        authorityApprovedDto.comment;
      document.type_two.signature.head_service_or_deanoffice_time = new Date();
    }
    if (documentCheck.number_sig === 4) {
      document.number_sig = 5;
      document.nextSignature = document.type_two.signature.dean_id;
      document.type_two.signature.deputy_dean_research_status_sig =
        SignatureStatus.approved;
      document.type_two.signature.deputy_dean_research_path_sig =
        authorityApprovedDto.filename;
      document.type_two.signature.deputy_dean_research_comment =
        authorityApprovedDto.comment;
      document.type_two.signature.deputy_dean_research_time = new Date();
    }
    if (documentCheck.number_sig === 5) {
      if (authorityApprovedDto.notApproved) {
        document.type_two.signature.dean_status_sig =
          SignatureStatus.notApproved;
      } else {
        document.type_two.signature.dean_status_sig = SignatureStatus.approved;
      }

      document.type_two.signature.dean_path_sig = authorityApprovedDto.filename;
      document.type_two.signature.dean_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_two.signature.save();
    return await document.save();
  }
}
