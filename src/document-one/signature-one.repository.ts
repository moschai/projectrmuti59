import { EntityRepository, Repository } from "typeorm";
import { fte_signature_one } from "./signature-one.entity";
import { CreateDocumentOneDto } from "./dto/create-document-one.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorityRepository } from "src/authority/authority.repository";
import { NotFoundException } from "@nestjs/common";
import { fte_authority } from "src/authority/authority.entity";

@EntityRepository(fte_signature_one)
export class SignatureOneRepository extends Repository<fte_signature_one>{

    // constructor(
    //     @InjectRepository(AuthorityRepository)
    //     private authorityRepo: AuthorityRepository
    // ) {
    //     super()
    // }
    async createSignature(
        createDocumentOneDto: CreateDocumentOneDto,
        advisor: fte_authority,
        mastersubject: fte_authority,
        head_service_or_deanoffice: fte_authority,
        deputy_dean_research: fte_authority,
        dean: fte_authority
    ): Promise<fte_signature_one> {

        const signatureOne = new fte_signature_one();
        signatureOne.advisor_id = advisor;
        signatureOne.mastersubject_id = mastersubject;
        signatureOne.head_service_or_deanoffice_id = head_service_or_deanoffice;
        signatureOne.deputy_dean_research_id = deputy_dean_research;
        signatureOne.dean_id = dean;
        return await this.save(signatureOne)
    }
}