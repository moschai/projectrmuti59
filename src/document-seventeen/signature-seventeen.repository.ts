import { EntityRepository, Repository } from "typeorm";
import { fte_signature_seventeen } from "./signature-seventeen.entity";
import { fte_authority } from "src/authority/authority.entity";
import { CreateDocumentSeventeenDto } from "./dto/create-document-seventeen.dto";

@EntityRepository(fte_signature_seventeen)
export class SignatureSeventeenRepository extends Repository<
  fte_signature_seventeen
> {
  async createSignature(
    createDocumentSeventeenDto: CreateDocumentSeventeenDto,
    advisor: fte_authority
  ): Promise<fte_signature_seventeen> {
    const signatureSeventeen = new fte_signature_seventeen();
    signatureSeventeen.advisor_id = advisor;
    return await this.save(signatureSeventeen);
  }
}
