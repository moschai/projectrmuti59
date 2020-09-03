import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_eleven } from "./document-type-eleven.entity";
import { CreateDocumentElevenDto } from "./dto/create-document-eleven.dto";
import { fte_signature_eleven } from "./signature-eleven.entity";

@EntityRepository(fte_document_type_eleven)
export class DocumentTypeElevenRepository extends Repository<
  fte_document_type_eleven
> {
  async createDocumentEleven(
    createDocumentElevenDto: CreateDocumentElevenDto,
    signatureEleven: fte_signature_eleven
  ): Promise<fte_document_type_eleven> {
    const documentEleven = new fte_document_type_eleven();
    documentEleven.changehistory = createDocumentElevenDto.changehistory;
    documentEleven.otherdocument = createDocumentElevenDto.otherdocument;
    documentEleven.othermassege = createDocumentElevenDto.othermassege;
    documentEleven.signature = signatureEleven;

    return await documentEleven.save();
  }
}
