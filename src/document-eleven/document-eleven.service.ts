import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentTypeElevenRepository } from "./document-type-eleven.repository";
import { SignatureElevenRepository } from "./signature-eleven.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentElevenDto } from "./dto/create-document-eleven.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { fte_authority } from "src/authority/authority.entity";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

@Injectable()
export class DocumentElevenService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeElevenRepository)
    private docTypeElevenRepo: DocumentTypeElevenRepository,
    @InjectRepository(SignatureElevenRepository)
    private signatureElevenRepo: SignatureElevenRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository
  ) {}
  async createDocument(createDocumentElevenDto: CreateDocumentElevenDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentElevenDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentElevenDto.mastersubject_id },
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
    const dean = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.dean },
    });
    if (!dean) {
      throw new NotFoundException("2");
    }
    const student = await this.studentRepo.createStudent(
      createDocumentElevenDto
    );
    const signatureEleven = await this.signatureElevenRepo.createSignature(
      createDocumentElevenDto,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      dean
    );
    const documentEleven = await this.docTypeElevenRepo.createDocumentEleven(
      createDocumentElevenDto,
      signatureEleven
    );
    return await this.documentRepo.createDocumentTypeEleven(
      student,
      documentEleven
    );
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }

  async getDocumentElevenByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_eleven"],
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
    const document = await this.getDocumentElevenByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_eleven.signature.advisor_id.id_authority !==
        authority.id_authority
      ) {
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.number_sig = 2;
      document.nextSignature = document.type_eleven.signature.mastersubject_id;
      document.type_eleven.signature.advisor_status_sig =
        SignatureStatus.approved;
      document.type_eleven.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_eleven.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_eleven.signature.advisor_time = new Date();
    }
    if (documentCheck.number_sig === 2) {
      document.number_sig = 3;
      document.nextSignature =
        document.type_eleven.signature.head_service_or_deanoffice_id;
      document.type_eleven.signature.mastersubject_status_sig =
        SignatureStatus.approved;
      document.type_eleven.signature.mastersubject_path_sig =
        authorityApprovedDto.filename;
      document.type_eleven.signature.mastersubject_comment =
        authorityApprovedDto.comment;
      document.type_eleven.signature.mastersubject_time = new Date();
    }
    if (documentCheck.number_sig === 3) {
      document.number_sig = 4;
      document.nextSignature = document.type_eleven.signature.dean_id;
      if (authorityApprovedDto.notApproved) {
        document.type_eleven.signature.head_service_or_deanoffice_status_sig =
          SignatureStatus.notApproved;
      } else {
        document.type_eleven.signature.head_service_or_deanoffice_status_sig =
          SignatureStatus.approved;
      }
      document.type_eleven.signature.head_service_or_deanoffice_path_sig =
        authorityApprovedDto.filename;
      document.type_eleven.signature.head_service_or_deanoffice_time = new Date();
    }
    if (documentCheck.number_sig === 4) {
      if (authorityApprovedDto.notApproved) {
        document.type_eleven.signature.dean_status_sig =
          SignatureStatus.notApproved;
      } else {
        document.type_eleven.signature.dean_status_sig =
          SignatureStatus.approved;
      }
      document.type_eleven.signature.dean_path_sig =
        authorityApprovedDto.filename;
      document.type_eleven.signature.dean_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_eleven.signature.save();
    return await document.save();
  }
}
