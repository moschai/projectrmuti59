import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_fourteen } from "./document-type-fourteen.entity";
import { CreateDocumentFourteenDto } from "./dto/create-document-fourteen.dto";
import { fte_signature_fourteen } from "./signature-fourteen.entity";

@EntityRepository(fte_document_type_fourteen)
export class DocumentTypeFourteenRepository extends Repository<
  fte_document_type_fourteen
> {
  async createDocumentFourteen(
    createDocumentFourteenDto: CreateDocumentFourteenDto,
    signatureFourteen: fte_signature_fourteen
  ): Promise<fte_document_type_fourteen> {
    const documentFourteen = new fte_document_type_fourteen();
    documentFourteen.behavioralreceipt =
      createDocumentFourteenDto.behavioralreceipt;
    documentFourteen.dear = createDocumentFourteenDto.dear;
    documentFourteen.classyear = createDocumentFourteenDto.classyear;
    documentFourteen.timestudy = createDocumentFourteenDto.timestudy;
    documentFourteen.signature = signatureFourteen;

    return await documentFourteen.save();
  }
}
