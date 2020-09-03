import { fte_document_type_seven } from "./document-type-seven.entity";
import { EntityRepository, Repository } from "typeorm";
import { fte_signature_seven } from "./signature-seven.entity";
import { CreateDocumentSevenDto } from "./dto/create-document-seven.dto";

@EntityRepository(fte_document_type_seven)
export class DocumentTypeSevenRepository extends Repository<
  fte_document_type_seven
> {
  async createDocumentSeven(
    createDocumentSevenDto: CreateDocumentSevenDto,
    signatureSeven: fte_signature_seven
  ): Promise<fte_document_type_seven> {
    const documentSeven = new fte_document_type_seven();
    documentSeven.termregister = createDocumentSevenDto.termregister;
    documentSeven.yearregister = createDocumentSevenDto.yearregister;
    documentSeven.classyear = createDocumentSevenDto.classyear;
    documentSeven.timestudy = createDocumentSevenDto.timestudy;
    documentSeven.signature = signatureSeven;

    return await documentSeven.save();
  }
}
