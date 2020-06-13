import { Injectable, NotFoundException } from "@nestjs/common";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentTypeElevenRepository } from "./document-type-eleven.repository";
import { SignatureElevenRepository } from "./signature-eleven.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { CreateDocumentElevenDto } from "./dto/create-document-eleven.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";

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
      createDocumentElevenDto
    );
    const signatureEleven = await this.signatureElevenRepo.createSignature(
      createDocumentElevenDto,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      deputy_dean_research,
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
}
