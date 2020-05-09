import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_eight } from "./document-type-eight.entity";
import { CreateDocumentEightDto } from "./dto/create-document-eight.dto";
import { fte_signature_eight } from "./signature-eight.entity";

@EntityRepository(fte_document_type_eight)
export class DocumentTypeEightRepository extends Repository<fte_document_type_eight> {

    async createDocumentEight(
        createDocumentEightDto: CreateDocumentEightDto,
        signatureEight: fte_signature_eight
    ): Promise<fte_document_type_eight> {
        const documentEight = new fte_document_type_eight();
        documentEight.movinggroupterm = createDocumentEightDto.movinggroupterm;
        documentEight.movinggroupyear = createDocumentEightDto.movinggroupyear;
        documentEight.movinggroupsince = createDocumentEightDto.movinggroupsince;
        documentEight.signature = signatureEight;
        return await documentEight.save();
    }
}