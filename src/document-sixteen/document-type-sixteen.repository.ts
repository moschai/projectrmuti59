import { fte_document_type_sixteen } from "./document-type-sixteen.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateDocumentSixteenDto } from "./dto/create-document-sixteen.dto";
import { fte_signature_sixteen } from "./signature-sixteen.entity";

@EntityRepository(fte_document_type_sixteen)
export class DocumentTypeSixteenRepository extends Repository<fte_document_type_sixteen>{
    async createDocumentSixteen(
        createDocumentSixteenDto: CreateDocumentSixteenDto,
        signatureSixteen: fte_signature_sixteen
    ): Promise<fte_document_type_sixteen> {
        const documentSixteen = new fte_document_type_sixteen();
        documentSixteen.delaygraduationterm = createDocumentSixteenDto.delaygraduationterm;
        documentSixteen.delaygraduationyear = createDocumentSixteenDto.delaygraduationyear;
        documentSixteen.classyear = createDocumentSixteenDto.classyear;
        documentSixteen.timestudy = createDocumentSixteenDto.timestudy;
        documentSixteen.typestudy = createDocumentSixteenDto.typestudy;
        documentSixteen.signature = signatureSixteen;
        return await documentSixteen.save();
    }
}