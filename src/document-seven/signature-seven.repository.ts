import { EntityRepository, Repository } from "typeorm";
import { fte_signature_seven } from "./signature-seven.entity";
import { CreateDocumentSevenDto } from "./dto/create-document-seven.dto";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_seven)
export class SignatureSevenRepository extends Repository<fte_signature_seven> {
  async createSignature(
    createDocumentSevenDto: CreateDocumentSevenDto,
    advisor: fte_authority
  ): Promise<fte_signature_seven> {
    const signatureSeven = new fte_signature_seven();
    signatureSeven.advisor_id = advisor;

    return await this.save(signatureSeven);
  }
}
