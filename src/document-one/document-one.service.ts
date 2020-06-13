import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeOneRepository } from "./document-type-one.repository";
import { SignatureOneRepository } from "./signature-one.repository";
import { CreateDocumentOneDto } from "./dto/create-document-one.dto";
import { AuthorityRepository } from "src/authority/authority.repository";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";

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
}
