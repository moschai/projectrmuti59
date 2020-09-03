import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_seventeen } from "./document-type-seventeen.entity";
import { CreateDocumentSeventeenDto } from "./dto/create-document-seventeen.dto";
import { fte_signature_seventeen } from "./signature-seventeen.entity";

@EntityRepository(fte_document_type_seventeen)
export class DocumentTypeSeventeenRepository extends Repository<
  fte_document_type_seventeen
> {
  async createDocumentSeventeen(
    createDocumentSeventeenDto: CreateDocumentSeventeenDto,
    signatureSeventeen: fte_signature_seventeen
  ): Promise<fte_document_type_seventeen> {
    const documentSeventeen = new fte_document_type_seventeen();

    documentSeventeen.signature = signatureSeventeen;

    return await documentSeventeen.save();
  }
}
