import { fte_authority } from "src/authority/authority.entity";
import { fte_signature_fifteen } from "./signature-fifteen.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateDocumentFifteenDto } from "./dto/create-document-fifteen.dto";

@EntityRepository(fte_signature_fifteen)
export class SignatureFifteenRepository extends Repository<fte_signature_fifteen>{

    async createSignature(
        createDocumentFifteenDto: CreateDocumentFifteenDto,
        advisor: fte_authority,
        mastersubject: fte_authority,
        authority_activity: fte_authority

    ): Promise<fte_signature_fifteen> {

        const signatureFifteen = new fte_signature_fifteen();
        signatureFifteen.advisor_id = advisor;
        signatureFifteen.mastersubject_id = mastersubject;
        signatureFifteen.authority_activity_id = authority_activity;

        return await this.save(signatureFifteen)
    }
}