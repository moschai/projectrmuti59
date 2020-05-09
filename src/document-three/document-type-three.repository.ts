import { fte_document_type_three } from "./document-type-three.entity";
import { EntityRepository, Repository } from "typeorm";
import { fte_signature_three } from "./signature-three.entity";
import { CreateDocumentThreeDto } from "./dto/create-document-three.dto";
import { DocumentThreeController } from "./document-three.controller";
import { DocumentThreeService } from "./document-three.service";

@EntityRepository(fte_document_type_three)
export class DocumentTypeThreeRepository extends Repository<fte_document_type_three>{
    async createDocumentThree(
        createDocumentThreeDto: CreateDocumentThreeDto,
        signatureThree: fte_signature_three
    ): Promise<fte_document_type_three> {
        const documentThree = new fte_document_type_three();
        documentThree.leaveterm = createDocumentThreeDto.leaveterm;
        documentThree.leaveyear = createDocumentThreeDto.leaveyear;
        documentThree.returnterm = createDocumentThreeDto.returnterm;
        documentThree.returnyear = createDocumentThreeDto.returnyear;
        documentThree.signature = signatureThree;

        return await documentThree.save();
    }
}