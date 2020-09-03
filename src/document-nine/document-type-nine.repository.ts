import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_nine } from "./document-type-nine.entity";
import { CreateDocumentNineDto } from "./dto/create-document-nine.dto";
import { fte_signature_nine } from "./signature-nine.entity";

@EntityRepository(fte_document_type_nine)
export class DocumentTypeNineRepository extends Repository<
  fte_document_type_nine
> {
  async createDocumentNine(
    createDocumentNineDto: CreateDocumentNineDto,
    signatureNine: fte_signature_nine
  ): Promise<fte_document_type_nine> {
    const documentNine = new fte_document_type_nine();
    documentNine.topic = createDocumentNineDto.topic;
    documentNine.latepaymentterm = createDocumentNineDto.lastepaymentterm;
    documentNine.latepaymentyear = createDocumentNineDto.latepaymentyear;
    documentNine.othermassege = createDocumentNineDto.othermassege;
    documentNine.otherdocument = createDocumentNineDto.otherdocument;
    documentNine.dear = createDocumentNineDto.dear;
    documentNine.classyear = createDocumentNineDto.classyear;
    documentNine.timestudy = createDocumentNineDto.timestudy;
    documentNine.signature = signatureNine;

    return await documentNine.save();
  }
}
