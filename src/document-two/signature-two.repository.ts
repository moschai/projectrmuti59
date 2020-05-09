import { EntityRepository, Repository } from "typeorm";
import { fte_signature_two } from "./signature-two.entity";
import { fte_authority } from "src/authority/authority.entity";
import { CreateDocumentTwoDto } from "./dto/create-document-two.dto";


@EntityRepository(fte_signature_two)
export class SignatureTwoRepository extends Repository<fte_signature_two> {
    async createSignature(
        createDocumentTwoDto: CreateDocumentTwoDto,
        advisor: fte_authority,
        mastersubject: fte_authority,
        head_service_or_deanoffice: fte_authority,
        deputy_dean_research: fte_authority,
        dean: fte_authority
    ): Promise<fte_signature_two> {

        const signatureTwo = new fte_signature_two();
        signatureTwo.advisor_id = advisor;
        signatureTwo.mastersubject_id = mastersubject;
        signatureTwo.head_service_or_deanoffice_id = head_service_or_deanoffice;
        signatureTwo.deputy_dean_research_id = deputy_dean_research;
        signatureTwo.dean_id = dean;
        return await this.save(signatureTwo)
    }
}