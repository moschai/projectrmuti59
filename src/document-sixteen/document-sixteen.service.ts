import { Injectable, NotFoundException } from "@nestjs/common";
import { DocumentRepository } from "src/document/document.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeSixteenRepository } from "./document-type-sixteen.repository";
import { SignatureSixteenRepository } from "./signature-sixteen.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentSixteenDto } from "./dto/create-document-sixteen.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";

@Injectable()
export class DocumentSixteenService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeSixteenRepository)
    private docTypeSixteenRepo: DocumentTypeSixteenRepository,
    @InjectRepository(SignatureSixteenRepository)
    private signatureSixteenRepo: SignatureSixteenRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository
  ) {}
  async createDocument(createDocumentSixteenDto: CreateDocumentSixteenDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentSixteenDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentSixteenDto.mastersubject_id },
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
      createDocumentSixteenDto
    );
    const signatureSixteen = await this.signatureSixteenRepo.createSignature(
      createDocumentSixteenDto,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      deputy_dean_research,
      dean
    );
    const documentSixteen = await this.docTypeSixteenRepo.createDocumentSixteen(
      createDocumentSixteenDto,
      signatureSixteen
    );
    return await this.documentRepo.createDocumentTypeSixteen(
      student,
      documentSixteen
    );
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }
}
