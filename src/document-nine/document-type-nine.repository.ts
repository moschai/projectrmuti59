import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_nine } from "./document-type-nine.entity";
import { CreateDocumentNineDto } from "./dto/create-document-nine.dto";
import { fte_signature_nine } from "./signature-nine.entity";

@EntityRepository(fte_document_type_nine)
export class DocumentTypeNineRepository extends Repository<fte_document_type_nine>{
    async createDocumentNine(
        createDocumentNineDto: CreateDocumentNineDto,
        signatureNine: fte_signature_nine
    ): Promise<fte_document_type_nine> {
        const documentNine = new fte_document_type_nine();
        documentNine.latepaymentterm = createDocumentNineDto.lastepaymentterm;
        documentNine.latepaymentyear = createDocumentNineDto.latepaymentyear;
        documentNine.latepaymentsince = createDocumentNineDto.latepaymentsince;
        documentNine.certificateterm = createDocumentNineDto.certificateterm;
        documentNine.certificateyear = createDocumentNineDto.certificateyear;
        documentNine.idsubject = createDocumentNineDto.idsubject;
        documentNine.namesubject = createDocumentNineDto.namesubject;
        documentNine.groupstudy = createDocumentNineDto.groupstudy;
        documentNine.nameauthority = createDocumentNineDto.nameauthority;
        documentNine.signatureteacher = createDocumentNineDto.signatureteacher;
        documentNine.signature = signatureNine;

        return await documentNine.save();
    }
}