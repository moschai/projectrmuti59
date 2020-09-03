import { fte_signature_eight } from "./signature-eight.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateDocumentEightDto } from "./dto/create-document-eight.dto";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_eight)
export class SignatureEightRepository extends Repository<fte_signature_eight> {
  async createSignature(
    createDocumentEightDto: CreateDocumentEightDto,
    advisor: fte_authority,
    advisornew: fte_authority
  ): Promise<fte_signature_eight> {
    const signatureEight = new fte_signature_eight();
    signatureEight.advisor_id = advisor;
    signatureEight.advisornew_id = advisornew;

    return await this.save(signatureEight);
  }
}
