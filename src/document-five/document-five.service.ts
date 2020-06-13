import { Injectable, NotFoundException } from "@nestjs/common";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentTypeFiveRepository } from "./document-type-five.repository";
import { SignatureFiveRepository } from "./signature-five.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentFiveDto } from "./dto/create-document-five.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";

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
}
