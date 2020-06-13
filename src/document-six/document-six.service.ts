import { Injectable, NotFoundException } from "@nestjs/common";
import { DocumentRepository } from "src/document/document.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeSixRepository } from "./document-type-six.repository";
import { SignatureSixRepository } from "./signature-six.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentSixDto } from "./dto/create-document-six.dto";
import { DocuemntSixTableRepository } from "./document-six-table.repository";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";

@Injectable()
export class DocumentSixService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeSixRepository)
    private docTypeSixRepo: DocumentTypeSixRepository,
    @InjectRepository(SignatureSixRepository)
    private signatureSixRepo: SignatureSixRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository,
    @InjectRepository(DocuemntSixTableRepository)
    private docuemntSixTableRepo: DocuemntSixTableRepository
  ) {}

  async createDocument(createDocumentSixDto: CreateDocumentSixDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentSixDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentSixDto.mastersubject_id },
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
    const student = await this.studentRepo.createStudent(createDocumentSixDto);
    const signatureSix = await this.signatureSixRepo.createSignature(
      createDocumentSixDto,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      deputy_dean_research,
      dean
    );
    const documentSix = await this.docTypeSixRepo.createDocumentSix(
      createDocumentSixDto,
      signatureSix
    );
    await this.docuemntSixTableRepo.createTableSix(
      createDocumentSixDto,
      documentSix
    );

    return await this.documentRepo.createDocumentTypeSix(student, documentSix);
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }
}
