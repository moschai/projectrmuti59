import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_eight } from "./document-type-eight.entity";
import { CreateDocumentEightDto } from "./dto/create-document-eight.dto";
import { fte_signature_eight } from "./signature-eight.entity";

@EntityRepository(fte_document_type_eight)
export class DocumentTypeEightRepository extends Repository<
  fte_document_type_eight
> {
  async createDocumentEight(
    createDocumentEightDto: CreateDocumentEightDto,
    signatureEight: fte_signature_eight
  ): Promise<fte_document_type_eight> {
    const documentEight = new fte_document_type_eight();
    documentEight.movinggroupterm = createDocumentEightDto.movinggroupterm;
    documentEight.movinggroupyear = createDocumentEightDto.movinggroupyear;
    documentEight.termstudy = createDocumentEightDto.termstudy;
    documentEight.yearstudy = createDocumentEightDto.yearstudy;
    documentEight.classyear = createDocumentEightDto.classyear;
    documentEight.timestudy = createDocumentEightDto.timestudy;
    documentEight.since = createDocumentEightDto.since;
    documentEight.otherdocument = createDocumentEightDto.otherdocument;
    documentEight.othermassege = createDocumentEightDto.othermassege;
    documentEight.signature = signatureEight;
    return await documentEight.save();
  }
}
