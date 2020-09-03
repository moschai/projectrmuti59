import { fte_signature_ten } from "./signature-ten.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateDocumentTenDto } from "./dto/create-document-ten.dto";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_ten)
export class SignatureTenRepository extends Repository<fte_signature_ten> {
  async createSignature(
    createDocumentTenDto: CreateDocumentTenDto,
    boardsubjectone: fte_authority,
    boardsubjecttwo: fte_authority,
    boardsubjectthree: fte_authority,
    boardsubjectfour: fte_authority,
    advisor: fte_authority,
    mastersubject: fte_authority,
    head_service_or_deanoffice: fte_authority,
    deputy_dean_research: fte_authority,
    dean: fte_authority
  ): Promise<fte_signature_ten> {
    const signatureTen = new fte_signature_ten();
    signatureTen.boardsubjectone_id = boardsubjectone;
    signatureTen.boardsubjecttwo_id = boardsubjecttwo;
    signatureTen.boardsubjectthree_id = boardsubjectthree;
    signatureTen.boardsubjectfour_id = boardsubjectfour;
    signatureTen.advisor_id = advisor;
    signatureTen.mastersubject_id = mastersubject;
    signatureTen.head_service_or_deanoffice_id = head_service_or_deanoffice;
    signatureTen.deputy_dean_research_id = deputy_dean_research;
    signatureTen.dean_id = dean;
    return await this.save(signatureTen);
  }
}
