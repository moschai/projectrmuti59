import { EntityRepository, Repository } from "typeorm";
import { fte_signature_nine } from "./signature-nine.entity";
import { CreateDocumentNineDto } from "./dto/create-document-nine.dto";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_nine)
export class SignatureNineRepository extends Repository<fte_signature_nine>{

    async createSignature(
        createDocumentNineDto: CreateDocumentNineDto,
        advisor: fte_authority,
        mastersubject: fte_authority,
        head_service_or_deanoffice: fte_authority,
        deputy_dean_research: fte_authority,
        dean: fte_authority
    ): Promise<fte_signature_nine> {

        const signatureNine = new fte_signature_nine();
        signatureNine.advisor_id = advisor;
        signatureNine.mastersubject_id = mastersubject;
        signatureNine.head_service_or_deanoffice_id = head_service_or_deanoffice;
        signatureNine.deputy_dean_research_id = deputy_dean_research;
        signatureNine.dean_id = dean;
        return await this.save(signatureNine)
    }
}

