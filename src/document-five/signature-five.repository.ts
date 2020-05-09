import { EntityRepository, Repository } from "typeorm";
import { fte_signature_five } from "./signature-five.entity";
import { fte_authority } from "src/authority/authority.entity";
import { CreateDocumentFiveDto } from "./dto/create-document-five.dto";

@EntityRepository(fte_signature_five)
export class SignatureFiveRepository extends Repository<fte_signature_five>{

    async createSignature(
        createDocumentFiveDto: CreateDocumentFiveDto,
        advisor: fte_authority,
        mastersubject: fte_authority,
        head_service_or_deanoffice: fte_authority,
        deputy_dean_research: fte_authority,
        dean: fte_authority
    ): Promise<fte_signature_five> {

        const signatureFive = new fte_signature_five();
        signatureFive.advisor_id = advisor;
        signatureFive.mastersubject_id = mastersubject;
        signatureFive.head_service_or_deanoffice_id = head_service_or_deanoffice;
        signatureFive.deputy_dean_research_id = deputy_dean_research;
        signatureFive.dean_id = dean;
        return await this.save(signatureFive)
    }
}