import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_fifteen } from "./document-type-fifteen.entity";
import { CreateDocumentFifteenDto } from "./dto/create-document-fifteen.dto";
import { fte_signature_fifteen } from "./signature-fifteen.entity";

@EntityRepository(fte_document_type_fifteen)
export class DocumentTypeFifteenRepository extends Repository<
  fte_document_type_fifteen
> {
  async createDocumentFifteen(
    createDocumentFifteenteenDto: CreateDocumentFifteenDto,
    signatureFifteen: fte_signature_fifteen
  ): Promise<fte_document_type_fifteen> {
    const documentFifteen = new fte_document_type_fifteen();
    documentFifteen.graduationrequestterm =
      createDocumentFifteenteenDto.graduationrequestterm;
    documentFifteen.graduationrequestyear =
      createDocumentFifteenteenDto.graduationrequestyear;
    documentFifteen.classyear = createDocumentFifteenteenDto.classyear;
    documentFifteen.timestudy = createDocumentFifteenteenDto.timestudy;
    documentFifteen.dear = createDocumentFifteenteenDto.dear;
    documentFifteen.since = createDocumentFifteenteenDto.since;
    documentFifteen.signature = signatureFifteen;

    return await documentFifteen.save();
  }
}
