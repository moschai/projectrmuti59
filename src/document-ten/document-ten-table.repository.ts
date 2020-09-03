import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_ten_table } from "./document-type-ten-table.entity";
import { CreateDocumentTenDto } from "./dto/create-document-ten.dto";
import { fte_document_type_ten } from "./document-type-ten.entity";

@EntityRepository(fte_document_type_ten_table)
export class DocumentTenTableRepository extends Repository<
  fte_document_type_ten_table
> {
  async createTableTen(
    createDocumentTenDto: CreateDocumentTenDto,
    documentTypeTen: fte_document_type_ten
  ) {
    const tables = [];
    createDocumentTenDto.tables.forEach((table) => {
      tables.push({ ...table, type: documentTypeTen });
    });

    return await this.createQueryBuilder()
      .insert()
      .into(fte_document_type_ten_table)
      .values(tables)
      .execute();
  }
}
