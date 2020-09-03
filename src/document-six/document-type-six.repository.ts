import { fte_document_type_six } from "./document-type-six.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateDocumentSixDto } from "./dto/create-document-six.dto";
import { fte_signature_six } from "./signature-six.entity";

@EntityRepository(fte_document_type_six)
export class DocumentTypeSixRepository extends Repository<
  fte_document_type_six
> {
  async createDocumentSix(
    createDocumentSixDto: CreateDocumentSixDto,
    signatureSix: fte_signature_six
  ): Promise<fte_document_type_six> {
    const documentSix = new fte_document_type_six();
    documentSix.termregister = createDocumentSixDto.termregister;
    documentSix.yearregister = createDocumentSixDto.yearregister;
    documentSix.termtotalunit = createDocumentSixDto.termtotalunit;
    documentSix.dear = createDocumentSixDto.dear;
    documentSix.classyear = createDocumentSixDto.classyear;
    documentSix.timestudy = createDocumentSixDto.timestudy;
    documentSix.PlsRegisOverLow = createDocumentSixDto.PlsRegisOverLow;
    documentSix.since = createDocumentSixDto.since;
    documentSix.signature = signatureSix;
    return await documentSix.save();
  }
}
