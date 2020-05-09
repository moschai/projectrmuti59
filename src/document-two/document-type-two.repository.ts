import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_two } from "./document-type-two.entity";
import { CreateDocumentTwoDto } from "./dto/create-document-two.dto";
import { fte_signature_two } from "./signature-two.entity";

@EntityRepository(fte_document_type_two)
export class DocumentTypeTwoRepository extends Repository<fte_document_type_two>{
    async createDocumentTwo(
        createDocumentTwoDto: CreateDocumentTwoDto,
        signatureTwo: fte_signature_two
    ): Promise<fte_document_type_two> {
        const documentTwo = new fte_document_type_two();
        documentTwo.takeleaveterm = createDocumentTwoDto.takeleaveterm;
        documentTwo.takeleaveyear = createDocumentTwoDto.takeleaveyear;
        documentTwo.dear = createDocumentTwoDto.dear;
        documentTwo.returnterm = createDocumentTwoDto.returnterm;
        documentTwo.returnyear = createDocumentTwoDto.returnyear;
        documentTwo.signature = signatureTwo;

        return await documentTwo.save();
    }
}