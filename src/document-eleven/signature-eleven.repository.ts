import { EntityRepository, Repository } from "typeorm";
import { fte_signature_eleven } from "./signature-eleven.entity";
import { CreateDocumentElevenDto } from "./dto/create-document-eleven.dto";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_eleven)
export class SignatureElevenRepository extends Repository<fte_signature_eleven>{

    async createSignature(
        createDocumentElevenDto: CreateDocumentElevenDto,
        advisor: fte_authority,
        mastersubject: fte_authority,
        head_service_or_deanoffice: fte_authority,
        deputy_dean_research: fte_authority,
        dean: fte_authority
    ): Promise<fte_signature_eleven> {

        const signatureEleven = new fte_signature_eleven();
        signatureEleven.advisor_id = advisor;
        signatureEleven.mastersubject_id = mastersubject;
        signatureEleven.head_service_or_deanoffice_id = head_service_or_deanoffice;
        signatureEleven.deputy_dean_research_id = deputy_dean_research;
        signatureEleven.dean_id = dean;
        return await this.save(signatureEleven)
    }
}
