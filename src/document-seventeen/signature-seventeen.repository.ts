import { EntityRepository, Repository } from "typeorm";
import { fte_signature_seventeen } from "./signature-seventeen.entity";
import { fte_authority } from "src/authority/authority.entity";
import { CreateDocumentSeventeenDto } from "./dto/create-document-seventeen.dto";

@EntityRepository(fte_signature_seventeen)
export class SignatureSeventeenRepository extends Repository<fte_signature_seventeen>{


    async createSignature(
        createDocumentSeventeenDto: CreateDocumentSeventeenDto,
        teacherteath: fte_authority,
        head_service_or_deanoffice: fte_authority

    ): Promise<fte_signature_seventeen> {

        const signatureSeventeen = new fte_signature_seventeen();
        signatureSeventeen.teacherteath_id = teacherteath;
        signatureSeventeen.head_service_or_deanoffice_id = head_service_or_deanoffice;
        return await this.save(signatureSeventeen)
    }
}