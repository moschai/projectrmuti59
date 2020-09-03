import { EntityRepository, Repository } from "typeorm";
import { fte_signature_fourteen } from "./signature-fourteen.entity";
import { CreateDocumentFourteenDto } from "./dto/create-document-fourteen.dto";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_fourteen)
export class SignatureFourteenRepository extends Repository<
  fte_signature_fourteen
> {
  async createSignature(
    createDocumentFourteenDto: CreateDocumentFourteenDto,
    advisor: fte_authority,
    mastersubject: fte_authority,
    headstudentdevelopment: fte_authority,
    deputydeanstudentdevelopment: fte_authority,
    dean: fte_authority
  ): Promise<fte_signature_fourteen> {
    const signatureFourteen = new fte_signature_fourteen();
    signatureFourteen.advisor_id = advisor;
    signatureFourteen.mastersubject_id = mastersubject;
    signatureFourteen.head_student_development_id = headstudentdevelopment;
    signatureFourteen.deputy_dean_student_development_id = deputydeanstudentdevelopment;
    signatureFourteen.dean_id = dean;
    return await this.save(signatureFourteen);
  }
}
