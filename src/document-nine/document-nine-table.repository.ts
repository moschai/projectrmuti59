import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_nine_table } from "./document-type-nine-table.entity";
import { CreateDocumentNineDto } from "./dto/create-document-nine.dto";
import { fte_document_type_nine } from "./document-type-nine.entity";

@EntityRepository(fte_document_type_nine_table)
export class DocuemntNineTableRepository extends Repository<
  fte_document_type_nine_table
> {
  async createTableNine(
    createDocumentNineDto: CreateDocumentNineDto,
    documentTypeNine: fte_document_type_nine
  ) {
    const tables = [];
    createDocumentNineDto.tables.forEach((table) => {
      tables.push({ ...table, type: documentTypeNine });
    });

    return await this.createQueryBuilder()
      .insert()
      .into(fte_document_type_nine_table)
      .values(tables)
      .execute();
  }
}
