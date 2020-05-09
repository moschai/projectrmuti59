import { fte_signature_three } from "./signature-three.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateDocumentThreeDto } from "./dto/create-document-three.dto";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_three)
export class SignatureThreeRepository extends Repository<fte_signature_three> {
    async createSignature(
        createDocumentThreeDto: CreateDocumentThreeDto,
        advisor: fte_authority,
        mastersubject: fte_authority,
        head_service_or_deanoffice: fte_authority,
        deputy_dean_research: fte_authority,
        dean: fte_authority
    ): Promise<fte_signature_three> {

        const signatureThree = new fte_signature_three();
        signatureThree.advisor_id = advisor;
        signatureThree.mastersubject_id = mastersubject;
        signatureThree.head_service_or_deanoffice_id = head_service_or_deanoffice;
        signatureThree.deputy_dean_research_id = deputy_dean_research;
        signatureThree.dean_id = dean;
        return await this.save(signatureThree)
    }
}