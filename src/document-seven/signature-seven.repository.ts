import { EntityRepository, Repository } from "typeorm";
import { fte_signature_seven } from "./signature-seven.entity";
import { CreateDocumentSevenDto } from "./dto/create-document-seven.dto";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_seven)
export class SignatureSevenRepository extends Repository<fte_signature_seven>{


    async createSignature(
        createDocumentSevenDto: CreateDocumentSevenDto,
        advisor: fte_authority,
        mastersubject: fte_authority,
        head_service_or_deanoffice: fte_authority,
        deputy_dean_research: fte_authority,
        dean: fte_authority
    ): Promise<fte_signature_seven> {

        const signatureSeven = new fte_signature_seven();
        signatureSeven.advisor_id = advisor;
        signatureSeven.mastersubject_id = mastersubject;
        signatureSeven.head_service_or_deanoffice_id = head_service_or_deanoffice;
        signatureSeven.deputy_dean_research_id = deputy_dean_research;
        signatureSeven.dean_id = dean;
        return await this.save(signatureSeven)
    }
}