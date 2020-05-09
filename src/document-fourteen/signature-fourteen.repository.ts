import { EntityRepository, Repository } from "typeorm";
import { fte_signature_fourteen } from "./signature-fourteen.entity";
import { CreateDocumentFourteenDto } from "./dto/create-document-fourteen.dto";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_fourteen)
export class SignatureFourteenRepository extends Repository<fte_signature_fourteen>{

    async createSignature(
        createDocumentFourteenDto: CreateDocumentFourteenDto,
        advisor: fte_authority,
        mastersubject: fte_authority,
        head_service_or_deanoffice: fte_authority,
        deputy_dean_research: fte_authority,
        dean: fte_authority
    ): Promise<fte_signature_fourteen> {

        const signatureFourteen = new fte_signature_fourteen();
        signatureFourteen.advisor_id = advisor;
        signatureFourteen.mastersubject_id = mastersubject;
        signatureFourteen.head_service_or_deanoffice_id = head_service_or_deanoffice;
        signatureFourteen.deputy_dean_research_id = deputy_dean_research;
        signatureFourteen.dean_id = dean;
        return await this.save(signatureFourteen)
    }
}