import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_seven_table } from "./document-type-seven-table.entity";
import { CreateDocumentSevenDto } from "./dto/create-document-seven.dto";
import { fte_document_type_seven } from "./document-type-seven.entity";

@EntityRepository(fte_document_type_seven_table)
export class DocuemntSevenTableRepository extends Repository<
  fte_document_type_seven_table
> {
  async createTableSeven(
    createDocumentSevenDto: CreateDocumentSevenDto,
    documentTypeSeven: fte_document_type_seven
  ) {
    const tables = [];
    createDocumentSevenDto.tables.forEach((table) => {
      tables.push({ ...table, type: documentTypeSeven });
    });

    return await this.createQueryBuilder()
      .insert()
      .into(fte_document_type_seven_table)
      .values(tables)
      .execute();

    // const signatureSeven = new fte_document_type_seven_table();
    // signatureSeven.advisor_id = advisor;
    // signatureSeven.mastersubject_id = mastersubject;
    // signatureSeven.head_service_or_deanoffice_id = head_service_or_deanoffice;
    // signatureSeven.deputy_dean_research_id = deputy_dean_research;
    // signatureSeven.dean_id = dean;
    // return await this.save(signatureSeven)
  }
}
