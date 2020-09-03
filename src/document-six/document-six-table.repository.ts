import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_six_table } from "./document-type-six-table.entity";
import { fte_document_type_six } from "./document-type-six.entity";
import { CreateDocumentSixDto } from "./dto/create-document-six.dto";

@EntityRepository(fte_document_type_six_table)
export class DocumentSixTableRepository extends Repository<
  fte_document_type_six_table
> {
  async createTableSix(
    createDocumentSixDto: CreateDocumentSixDto,
    documentTypeSeven: fte_document_type_six
  ) {
    const tables = [];
    createDocumentSixDto.tables.forEach((table, i) => {
      tables.push({ ...table, subjectno: i + 1, type: documentTypeSeven });
    });

    return await this.createQueryBuilder()
      .insert()
      .into(fte_document_type_six_table)
      .values(tables)
      .execute();
  }
}
