import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentRepository } from "src/document/document.repository";
import { StudentRepository } from "src/student/student.repository";
import { DocumentTypeTenRepository } from "./document-type-ten.repository";
import { SignatureTenRepository } from "./signature-ten.repository";
import { AuthorityRepository } from "src/authority/authority.repository";
import { DocuemntTenTableRepository } from "./document-ten-table.repository";
import { CreateDocumentTenDto } from "./dto/create-document-ten.dto";
import { EPositionAuthority } from "src/authority/enum/position-authority.enum";

@Injectable()
export class DocumentTenService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
    @InjectRepository(DocumentTypeTenRepository)
    private docTypeTenRepo: DocumentTypeTenRepository,
    @InjectRepository(SignatureTenRepository)
    private signatureTenRepo: SignatureTenRepository,
    @InjectRepository(AuthorityRepository)
    private authorityRepo: AuthorityRepository,
    @InjectRepository(DocuemntTenTableRepository)
    private docuemntTenTableRepo: DocuemntTenTableRepository
  ) {}

  async createDocument(createDocumentTenDto: CreateDocumentTenDto) {
    const advisor = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentTenDto.advisor_id },
    });
    if (!advisor) {
      throw new NotFoundException("รหัสอาจารย์ที่ปรึกษาไม่ถูกต้อง");
    }
    const mastersubject = await this.authorityRepo.findOne({
      where: { id_authority: createDocumentTenDto.mastersubject_id },
    });
    if (!mastersubject) {
      throw new NotFoundException("รหัสหัวหน้าสาขาวิชาไม่ถูกต้อง");
    }
    const boardsubjectone = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.boardsubjectone },
    });
    if (!boardsubjectone) {
      throw new NotFoundException("1");
    }
    const boardsubjecttwo = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.boardsubjecttwo },
    });
    if (!boardsubjectone) {
      throw new NotFoundException("2");
    }
    const boardsubjectthree = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.boardsubjectthree },
    });
    if (!boardsubjectone) {
      throw new NotFoundException("3");
    }

    const boardsubjectfour = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.boardsubjectfour },
    });
    if (!boardsubjectone) {
      throw new NotFoundException("4");
    }

    const head_service_or_deanoffice = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.headServiceDeanoffice },
    });
    if (!head_service_or_deanoffice) {
      throw new NotFoundException("5");
    }

    const dean = await this.authorityRepo.findOne({
      where: { position_authority: EPositionAuthority.dean },
    });
    if (!dean) {
      throw new NotFoundException("6");
    }
    const student = await this.studentRepo.createStudent(createDocumentTenDto);
    const signatureTen = await this.signatureTenRepo.createSignature(
      createDocumentTenDto,
      boardsubjectone,
      boardsubjecttwo,
      boardsubjectthree,
      boardsubjectfour,
      advisor,
      mastersubject,
      head_service_or_deanoffice,
      dean
    );
    const documentTen = await this.docTypeTenRepo.createDocumentTen(
      createDocumentTenDto,
      signatureTen
    );
    await this.docuemntTenTableRepo.createTableTen(
      createDocumentTenDto,
      documentTen
    );

    return await this.documentRepo.createDocumentTypeTen(student, documentTen);
    //สร้างนักศึกษา -> สร้างลายเซ็น -> สร้าง doc type -> สร้าง doc
  }
}
