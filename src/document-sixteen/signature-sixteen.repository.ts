import { fte_signature_sixteen } from "./signature-sixteen.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateDocumentSixteenDto } from "./dto/create-document-sixteen.dto";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_sixteen)
export class SignatureSixteenRepository extends Repository<fte_signature_sixteen> {
    async createSignature(
        createDocumentSixteenDto: CreateDocumentSixteenDto,
        advisor: fte_authority,
        mastersubject: fte_authority,
        head_service_or_deanoffice: fte_authority,
        deputy_dean_research: fte_authority,
        dean: fte_authority
    ): Promise<fte_signature_sixteen> {

        const signatureSixteen = new fte_signature_sixteen();
        signatureSixteen.advisor_id = advisor;
        signatureSixteen.mastersubject_id = mastersubject;
        signatureSixteen.head_service_or_deanoffice_id = head_service_or_deanoffice;
        signatureSixteen.deputy_dean_research_id = deputy_dean_research;
        signatureSixteen.dean_id = dean;
        return await this.save(signatureSixteen)
    }
}