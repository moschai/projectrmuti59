import { EntityRepository, Repository } from "typeorm";
import { fte_signature_twelve } from "./signature-twelve.entity";
import { CreateDocumentTwelveDto } from "./dto/create-document-twelve.dto";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_twelve)
export class SignatureTwelveRepository extends Repository<fte_signature_twelve>{

    async createSignature(
        createDocumentTwelveDto: CreateDocumentTwelveDto,
        advisor: fte_authority,
        mastersubject: fte_authority,
        head_service_or_deanoffice: fte_authority,
        deputy_dean_research: fte_authority,
        dean: fte_authority
    ): Promise<fte_signature_twelve> {

        const signatureTwelve = new fte_signature_twelve();
        signatureTwelve.advisor_id = advisor;
        signatureTwelve.mastersubject_id = mastersubject;
        signatureTwelve.head_service_or_deanoffice_id = head_service_or_deanoffice;
        signatureTwelve.deputy_dean_research_id = deputy_dean_research;
        signatureTwelve.dean_id = dean;
        return await this.save(signatureTwelve)
    }
}