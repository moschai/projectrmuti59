import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_twelve } from "./document-type-twelve.entity";
import { CreateDocumentTwelveDto } from "./dto/create-document-twelve.dto";
import { fte_signature_twelve } from "./signature-twelve.entity";

@EntityRepository(fte_document_type_twelve)
export class DocumentTypeTwelveRepository extends Repository<
  fte_document_type_twelve
> {
  async createDocumentTwelve(
    createDocumentTwelveDto: CreateDocumentTwelveDto,
    signatureTwelve: fte_signature_twelve
  ): Promise<fte_document_type_twelve> {
    const documentTwelve = new fte_document_type_twelve();
    documentTwelve.resignsince = createDocumentTwelveDto.resignsince;
    documentTwelve.nameparent = createDocumentTwelveDto.nameparent;
    documentTwelve.surname = createDocumentTwelveDto.surname;
    documentTwelve.phoneparent = createDocumentTwelveDto.phoneparent;
    documentTwelve.signatureparent = createDocumentTwelveDto.signatureparent;
    documentTwelve.dayborn = createDocumentTwelveDto.dayborn;
    documentTwelve.monthborn = createDocumentTwelveDto.monthborn;
    documentTwelve.yearborn = createDocumentTwelveDto.yearborn;
    documentTwelve.ageborn = createDocumentTwelveDto.ageborn;

    documentTwelve.signature = signatureTwelve;

    return await documentTwelve.save();
  }
}
