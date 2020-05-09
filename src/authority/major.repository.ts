import { EntityRepository, Repository } from "typeorm";
import { fte_major } from "./major.entity";


@EntityRepository(fte_major)
export class MajorRepository extends Repository<fte_major>{

}
