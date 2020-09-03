import { fte_document_type_ten } from "./document-type-ten.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateDocumentTenDto } from "./dto/create-document-ten.dto";
import { fte_signature_ten } from "./signature-ten.entity";

@EntityRepository(fte_document_type_ten)
export class DocumentTypeTenRepository extends Repository<
  fte_document_type_ten
> {
  async createDocumentTen(
    createDocumentTenDto: CreateDocumentTenDto,
    signatureTen: fte_signature_ten
  ): Promise<fte_document_type_ten> {
    const documentTen = new fte_document_type_ten();
    documentTen.compareterm = createDocumentTenDto.compareterm;
    documentTen.compareyeat = createDocumentTenDto.compareyeat;
    documentTen.dear = createDocumentTenDto.dear;
    documentTen.cumulativeGpa = createDocumentTenDto.cumulativeGpa;
    documentTen.signature = signatureTen;
    return await documentTen.save();
  }
}
