import { EntityRepository, Repository } from "typeorm";
import { fte_subject } from "./subject.entity";

@EntityRepository(fte_subject)
export class SubjectRepository extends Repository<fte_subject>{
    
}