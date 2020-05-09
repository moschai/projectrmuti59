import { EntityRepository, Repository } from "typeorm";
import { fte_signature_thirteen } from "./signature-thirteen.entity";
import { CreateDocumentThirteenDto } from "./dto/create-document-thirteen.dto";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_thirteen)
export class SignatureThirteenRepository extends Repository<fte_signature_thirteen> {
    async createSignature(
        createDocumentThirteenDto: CreateDocumentThirteenDto,
        studentt: fte_authority,

    ): Promise<fte_signature_thirteen> {

        const signatureThirteen = new fte_signature_thirteen();
        signatureThirteen.studentt_id = studentt;
        return await this.save(signatureThirteen)
    }
}