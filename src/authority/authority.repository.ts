import { EntityRepository, Repository } from "typeorm";
import { fte_authority } from "./authority.entity";


@EntityRepository(fte_authority)
export class AuthorityRepository extends Repository<fte_authority>{

}