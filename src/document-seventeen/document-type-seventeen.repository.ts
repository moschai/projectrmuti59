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
    documentSeventeen.idsubject = createDocumentSeventeenDto.idsubject;
    documentSeventeen.namesubject = createDocumentSeventeenDto.namesubject;
    documentSeventeen.groupstudy = createDocumentSeventeenDto.groupstudy;
    documentSeventeen.registernow = createDocumentSeventeenDto.registernow;
    documentSeventeen.registeradd = createDocumentSeventeenDto.registeradd;
    documentSeventeen.pastidsubject = createDocumentSeventeenDto.pastidsubject;
    documentSeventeen.pastnamesubject =
      createDocumentSeventeenDto.pastnamesubject;
    documentSeventeen.newidsubject = createDocumentSeventeenDto.newidsubject;
    documentSeventeen.newnamesubject =
      createDocumentSeventeenDto.newnamesubject;
    documentSeventeen.signature = signatureSeventeen;

    return await documentSeventeen.save();
  }
}
