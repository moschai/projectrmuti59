import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_five } from "./document-type-five.entity";
import { CreateDocumentFiveDto } from "./dto/create-document-five.dto";
import { fte_signature_five } from "./signature-five.entity";

@EntityRepository(fte_document_type_five)
export class DocumentTypeFiveRepository extends Repository<
  fte_document_type_five
> {
  async createDocumentFive(
    createDocumentFiveDto: CreateDocumentFiveDto,
    signatureFive: fte_signature_five
  ): Promise<fte_document_type_five> {
    const documentFive = new fte_document_type_five();
    documentFive.maintaintake = createDocumentFiveDto.maintaintake;
    documentFive.takeleaveterm = createDocumentFiveDto.takeleaveterm;
    documentFive.takeleaveyear = createDocumentFiveDto.takeleaveyear;
    documentFive.takeleaveno = createDocumentFiveDto.takeleaveno;
    documentFive.since = createDocumentFiveDto.since;
    documentFive.dear = createDocumentFiveDto.dear;
    documentFive.cumulativeGpa = createDocumentFiveDto.cumulativeGpa;
    documentFive.signature = signatureFive;
    return await documentFive.save();
  }
}
