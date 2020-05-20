import { EntityRepository, Repository } from "typeorm";
import { fte_authority } from "./authority.entity";
import * as bcrypt from 'bcrypt'
import { CreateAuthorityDto } from "./dto/create-authority.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";



@EntityRepository(fte_authority)
export class AuthorityRepository extends Repository<fte_authority>{
    async createAdmin(createAuthorityDto: CreateAuthorityDto) {
        const { username, password } = createAuthorityDto;
        const authority = new fte_authority();
        authority.username = username;
        authority.salt = await bcrypt.genSalt();
        authority.password = await this.hashPassword(password, authority.salt);
        try {
            return await authority.save();
        } catch (error) {
            if (error.sqlState === '23000') {
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

}