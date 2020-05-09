import { EntityRepository, Repository } from "typeorm";
import { fte_signature_four } from "./signature-four.entity";
import { fte_authority } from "src/authority/authority.entity";
import { CreateDocumentFourDto } from "./dto/create-document-four.dto";

@EntityRepository(fte_signature_four)
export class SignatureFourRepository extends Repository<fte_signature_four>{

    async createSignature(
        createDocumentFourDto: CreateDocumentFourDto,
        advisor: fte_authority,
        mastersubject: fte_authority,
        head_service_or_deanoffice: fte_authority,
        deputy_dean_research: fte_authority,
        dean: fte_authority
    ): Promise<fte_signature_four> {

        const signatureFour = new fte_signature_four();
        signatureFour.advisor_id = advisor;
        signatureFour.mastersubject_id = mastersubject;
        signatureFour.head_service_or_deanoffice_id = head_service_or_deanoffice;
        signatureFour.deputy_dean_research_id = deputy_dean_research;
        signatureFour.dean_id = dean;
        return await this.save(signatureFour)
    }
}