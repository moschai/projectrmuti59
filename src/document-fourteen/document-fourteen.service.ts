import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeFourteenRepository } from "./document-type-fourteen.repository";
import { SignatureFourteenRepository } from "./signature-fourteen.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentFourteenDto } from "./dto/create-document-fourteen.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { SignatureStatus } from "src/document/enum/signature-status.enum";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { fte_authority } from "src/authority/authority.entity";

@Injectable()
export class DocumentFourteenService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeFourteenRepository)
    private docTypeFourteenRepo: DocumentTypeFourteenRepository,
    @InjectRepository(SignatureFourteenRepository)
    private signatureFourteenRepo: SignatureFourteenRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository
  ) {}
  async createDocument(createDocumentFourteenDto: CreateDocumentFourteenDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentFourteenDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentFourteenDto.mastersubject_id },
    });
    if (!mastersubject) {
      throw new NotFoundException("รหัสหัวหน้าสาขาวิชาไม่ถูกต้อง");
    }
    const headstudentdevelopment = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.headStudentDevelopment },
    });
    if (!headstudentdevelopment) {
      throw new NotFoundException("1");
    }

    const deputydeanstudentdevelopment = await this.authorityRepo.findOne({
      where: {
        position_authority: EPositionAuthority.deputyDeanStdDvlment,
      },
    });
    if (!deputydeanstudentdevelopment) {
      throw new NotFoundException("2");
    }

    const dean = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.dean },
    });
    if (!dean) {
      throw new NotFoundException("3");
    }
    const student = await this.studentRepo.createStudent(
      createDocumentFourteenDto
    );
    const signatureFourteen = await this.signatureFourteenRepo.createSignature(
      createDocumentFourteenDto,
      advisor,
      mastersubject,
      headstudentdevelopment,
      deputydeanstudentdevelopment,
      dean
    );
    const documentFourteen = await this.docTypeFourteenRepo.createDocumentFourteen(
      createDocumentFourteenDto,
      signatureFourteen
    );
    return await this.documentRepo.createDocumentTypeFourteen(
      student,
      documentFourteen
    );
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }
  async getDocumentFourteenByDocumentId(documentId: number) {
    const document = await this.documentRepo.findOne({
      relations: ["type_fourteen"],
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
    const document = await this.getDocumentFourteenByDocumentId(documentId);
    const documentCheck = { ...document };
    if (documentCheck.number_sig === 1) {
      if (
        document.type_fourteen.signature.advisor_id.id_authority !==
        authority.id_authority
      ) {
        throw new ConflictException("การอนุมัติไม่ถูกต้อง");
      }
      document.number_sig = 2;
      document.nextSignature =
        document.type_fourteen.signature.mastersubject_id;
      document.type_fourteen.signature.advisor_status_sig =
        SignatureStatus.approved;
      document.type_fourteen.signature.advisor_path_sig =
        authorityApprovedDto.filename;
      document.type_fourteen.signature.advisor_comment =
        authorityApprovedDto.comment;
      document.type_fourteen.signature.advisor_time = new Date();
    }
    if (documentCheck.number_sig === 2) {
      document.number_sig = 3;
      document.nextSignature =
        document.type_fourteen.signature.head_student_development_id;
      document.type_fourteen.signature.mastersubject_status_sig =
        SignatureStatus.approved;
      document.type_fourteen.signature.mastersubject_path_sig =
        authorityApprovedDto.filename;
      document.type_fourteen.signature.mastersubject_comment =
        authorityApprovedDto.comment;
      document.type_fourteen.signature.mastersubject_time = new Date();
    }
    if (documentCheck.number_sig === 3) {
      document.number_sig = 4;
      document.nextSignature =
        document.type_fourteen.signature.deputy_dean_student_development_id;
      document.type_fourteen.signature.head_student_development_status_sig =
        SignatureStatus.approved;
      document.type_fourteen.signature.head_student_development_path_sig =
        authorityApprovedDto.filename;
      document.type_fourteen.signature.head_student_development_comment =
        authorityApprovedDto.comment;
      document.type_fourteen.signature.head_student_development_time = new Date();
    }
    if (documentCheck.number_sig === 4) {
      document.number_sig = 5;
      document.nextSignature = document.type_fourteen.signature.dean_id;
      document.type_fourteen.signature.deputy_dean_student_development_status_sig =
        SignatureStatus.approved;
      document.type_fourteen.signature.head_student_development_path_sig =
        authorityApprovedDto.filename;
      document.type_fourteen.signature.deputy_dean_student_development_comment =
        authorityApprovedDto.comment;
      document.type_fourteen.signature.deputy_dean_student_development_time = new Date();
    }
    if (documentCheck.number_sig === 5) {
      if (authorityApprovedDto.notApproved) {
        document.type_fourteen.signature.dean_status_sig =
          SignatureStatus.notApproved;
      } else {
        document.type_fourteen.signature.dean_status_sig =
          SignatureStatus.approved;
      }
      document.type_fourteen.signature.dean_path_sig =
        authorityApprovedDto.filename;
      document.type_fourteen.signature.dean_time = new Date();
      document.isAllSignature = true;
    }

    await document.type_fourteen.signature.save();
    return await document.save();
  }
}
