import { fte_document_type_four } from "./documet-type-four.entity";
import { EntityRepository, Repository } from "typeorm";
import { fte_signature_four } from "./signature-four.entity";
import { CreateDocumentFourDto } from "./dto/create-document-four.dto";

@EntityRepository(fte_document_type_four)
export class DocumentTypeFourRepository extends Repository<fte_document_type_four>{
    async createDocumentFour(
        createDocumentFourDto: CreateDocumentFourDto,
        signatureFour: fte_signature_four
    ): Promise<fte_document_type_four> {
        const documentFour = new fte_document_type_four();
        documentFour.overstandard = createDocumentFourDto.overstandard;
        documentFour.lowstandard = createDocumentFourDto.lowstandard;
        documentFour.termunit = createDocumentFourDto.termunit;
        documentFour.termsumunit = createDocumentFourDto.termsumunit;
        documentFour.termremainunit = createDocumentFourDto.termremainunit;
        documentFour.overstandardsince = createDocumentFourDto.overstandardsince;
        documentFour.lowstandardsince = createDocumentFourDto.lowstandardsince;
        documentFour.signature = signatureFour;
        return await documentFour.save();
    }
}