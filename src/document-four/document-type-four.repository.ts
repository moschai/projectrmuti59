import { fte_document_type_four } from "./documet-type-four.entity";
import { EntityRepository, Repository } from "typeorm";
import { fte_signature_four } from "./signature-four.entity";
import { CreateDocumentFourDto } from "./dto/create-document-four.dto";

@EntityRepository(fte_document_type_four)
export class DocumentTypeFourRepository extends Repository<
  fte_document_type_four
> {
  async createDocumentFour(
    createDocumentFourDto: CreateDocumentFourDto,
    signatureFour: fte_signature_four
  ): Promise<fte_document_type_four> {
    const documentFour = new fte_document_type_four();

    documentFour.sumorremainunit = createDocumentFourDto.sumorremainunit;
    documentFour.overlowstandardsince =
      createDocumentFourDto.overslowstandardsince;
    documentFour.signature = signatureFour;
    documentFour.dear = createDocumentFourDto.dear;
    documentFour.termstudy = createDocumentFourDto.termstudy;
    documentFour.yearstudy = createDocumentFourDto.yearstudy;
    documentFour.cumulativeGpa = createDocumentFourDto.cumulativeGpa;
    documentFour.overlowstandard = createDocumentFourDto.overlowstandard;

    return await documentFour.save();
  }
}
