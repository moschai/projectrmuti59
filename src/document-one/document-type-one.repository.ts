import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_one } from "./document-type-one.entity";
import { CreateDocumentOneDto } from "./dto/create-document-one.dto";
import { fte_signature_one } from "./signature-one.entity";

@EntityRepository(fte_document_type_one)
export class DocumentTypeOneRepository extends Repository<
  fte_document_type_one
> {
  async createDocumentOne(
    createDocumentOneDto: CreateDocumentOneDto,
    signatureOne: fte_signature_one
  ): Promise<fte_document_type_one> {
    const documentOne = new fte_document_type_one();
    documentOne.signature = signatureOne;
    documentOne.topic = createDocumentOneDto.topic;
    documentOne.dear = createDocumentOneDto.dear;
    documentOne.purpose = createDocumentOneDto.purpose;

    documentOne.classyear = createDocumentOneDto.classyear;
    documentOne.timestudy = createDocumentOneDto.timestudy;

    return await documentOne.save();
  }
}
