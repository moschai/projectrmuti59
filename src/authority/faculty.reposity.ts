import { fte_faculty } from "./faculty.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(fte_faculty)
export class FacultyRepository extends Repository<fte_faculty>{

}
