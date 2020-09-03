import { fte_document_type_eight_table } from "./document-type-eight-table.entity";
import { Repository, EntityRepository } from "typeorm";
import { CreateDocumentEightDto } from "./dto/create-document-eight.dto";
import { fte_document_type_eight } from "./document-type-eight.entity";

@EntityRepository(fte_document_type_eight_table)
export class DocumentEightTableRepository extends Repository<
  fte_document_type_eight_table
> {
  async createTableEight(
    createDocumentEightDto: CreateDocumentEightDto,
    documentTypeEight: fte_document_type_eight
  ) {
    const tables = [];
    createDocumentEightDto.tables.forEach((table) => {
      tables.push({ ...table, type: documentTypeEight });
    });

    return await this.createQueryBuilder()
      .insert()
      .into(fte_document_type_eight_table)
      .values(tables)
      .execute();
  }
}
