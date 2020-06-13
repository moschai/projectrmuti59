import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeNineRepository } from "./document-type-nine.repository";
import { SignatureNineRepository } from "./signature-nine.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentNineDto } from "./dto/create-document-nine.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";
import { DocuemntNineTableRepository } from "./document-nine-table.repository";

@Injectable()
export class DocumentNineService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeNineRepository)
    private docTypeNineRepo: DocumentTypeNineRepository,
    @InjectRepository(SignatureNineRepository)
    private signatureNineRepo: SignatureNineRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository,
    @InjectRepository(DocuemntNineTableRepository)
    private docuemntNineTableRepo: DocuemntNineTableRepository
  ) {}
  async createDocument(createDocumentNineDto: CreateDocumentNineDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentNineDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentNineDto.mastersubject_id },
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
    const student = await this.studentRepo.createStudent(createDocumentNineDto);
    const signatureNine = await this.signatureNineRepo.createSignature(
      createDocumentNineDto,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      deputy_dean_research,
      dean
    );
    const documentNine = await this.docTypeNineRepo.createDocumentNine(
      createDocumentNineDto,
      signatureNine
    );
    await this.docuemntNineTableRepo.createTableNine(
      createDocumentNineDto,
      documentNine
    );
    return await this.documentRepo.createDocumentTypeNine(
      student,
      documentNine
    );
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }
}
