import { fte_signature_six } from "./signature-six.entity";
import { Repository, EntityRepository } from "typeorm";
import { CreateDocumentSixDto } from "./dto/create-document-six.dto";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_six)
export class SignatureSixRepository extends Repository<fte_signature_six>{


    async createSignature(
        createDocumentSixDto: CreateDocumentSixDto,
        advisor: fte_authority,
        mastersubject: fte_authority,
        head_service_or_deanoffice: fte_authority,
        deputy_dean_research: fte_authority,
        dean: fte_authority
    ): Promise<fte_signature_six> {

        const signatureSix = new fte_signature_six();
        signatureSix.advisor_id = advisor;
        signatureSix.mastersubject_id = mastersubject;
        signatureSix.head_service_or_deanoffice_id = head_service_or_deanoffice;
        signatureSix.deputy_dean_research_id = deputy_dean_research;
        signatureSix.dean_id = dean;
        return await this.save(signatureSix)
    }
}