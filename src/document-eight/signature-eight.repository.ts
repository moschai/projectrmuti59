import { fte_signature_eight } from "./signature-eight.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateDocumentEightDto } from "./dto/create-document-eight.dto";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_eight)
export class SignatureEightRepository extends Repository<fte_signature_eight>{


    async createSignature(
        createDocumentEightDto: CreateDocumentEightDto,
        advisor: fte_authority,
        mastersubject: fte_authority,
        head_service_or_deanoffice: fte_authority,
        deputy_dean_research: fte_authority,
        dean: fte_authority
    ): Promise<fte_signature_eight> {

        const signatureEight = new fte_signature_eight();
        signatureEight.advisor_id = advisor;
        signatureEight.mastersubject_id = mastersubject;
        signatureEight.head_service_or_deanoffice_id = head_service_or_deanoffice;
        signatureEight.deputy_dean_research_id = deputy_dean_research;
        signatureEight.dean_id = dean;
        return await this.save(signatureEight)
    }
}