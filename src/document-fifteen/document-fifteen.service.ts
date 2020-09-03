import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeFifteenRepository } from "./document-type-fifteen.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { SignatureFifteenRepository } from "./signature-fifteen.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentFifteenDto } from "./dto/create-document-fifteen.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { fte_authority } from "src/authority/authority.entity";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

@Injectable()
export class DocumentFifteenService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeFifteenRepository)
    private docTypeFifteenRepo: DocumentTypeFifteenRepository,
    @InjectRepository(SignatureFifteenRepository)
    private signatureFifteenRepo: SignatureFifteenRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository
  ) {}
  async createDocument(createDocumentFifteenDto: CreateDocumentFifteenDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentFifteenDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentFifteenDto.mastersubject_id },
    });
    if (!mastersubject) {
      throw new NotFoundException("รหัสหัวหน้าสาขาวิชาไม่ถูกต้อง");
    }

    const authority_activity = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.authorityactivity },
    });
    if (!authority_activity) {
      throw new NotFoundException("1");
    }

    const student = await this.studentRepo.createStudent(
      createDocumentFifteenDto
    );

    const signatureFifteen = await this.signatureFifteenRepo.createSignature(
      createDocumentFifteenDto,
      advisor,
      mastersubject,
      authority_activity
    );
    const documentFifteen = await this.docTypeFifteenRepo.createDocumentFifteen(
      createDocumentFifteenDto,
      signatureFifteen
    );
    return await this.documentRepo.createDocumentTypeFifteen(
      student,
      documentFifteen
    );
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }
  async getDocumentFifteenByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_fifteen"],
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
    const document = await this.getDocumentFifteenByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_fifteen.signature.advisor_id.id_authority !==
        authority.id_authority
      ) {
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.number_sig = 2;
      document.nextSignature = document.type_fifteen.signature.mastersubject_id;
      document.type_fifteen.signature.advisor_status_sig =
        SignatureStatus.approved;
      document.type_fifteen.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_fifteen.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_fifteen.signature.advisor_time = new Date();
    }
    if (documentCheck.number_sig === 2) {
      document.number_sig = 3;
      document.nextSignature =
        document.type_fifteen.signature.authority_activity_id;
      document.type_fifteen.signature.mastersubject_status_sig =
        SignatureStatus.approved;
      document.type_fifteen.signature.mastersubject_path_sig =
        authorityApprovedDto.filename;
      document.type_fifteen.signature.mastersubject_comment =
        authorityApprovedDto.comment;
      document.type_fifteen.signature.mastersubject_time = new Date();
    }
    if (documentCheck.number_sig === 3) {
      document.type_fifteen.signature.authority_activity_status_sig =
        SignatureStatus.approved;
      document.type_fifteen.signature.authority_activity_path_sig =
        authorityApprovedDto.filename;
      document.type_fifteen.signature.std_notorpass_activity =
        authorityApprovedDto.std_notorpass_activity;
      document.type_fifteen.signature.std_activityunit =
        authorityApprovedDto.std_activityunit;
      document.type_fifteen.signature.other_activityst =
        authorityApprovedDto.other_activityst;
      document.type_fifteen.signature.other_activitystone =
        authorityApprovedDto.other_activitystone;
      document.type_fifteen.signature.other_activitysttwo =
        authorityApprovedDto.other_activitysttwo;
      document.type_fifteen.signature.other_activitystthree =
        authorityApprovedDto.other_activitystthree;
      document.type_fifteen.signature.commentone_activity =
        authorityApprovedDto.commentone_activity;
      document.type_fifteen.signature.commenttwo_activity =
        authorityApprovedDto.commenttwo_activity;
      document.type_fifteen.signature.commentthree_activity =
        authorityApprovedDto.commentthree_activity;
      document.type_fifteen.signature.authority_activity_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_fifteen.signature.save();
    return await document.save();
  }
}
