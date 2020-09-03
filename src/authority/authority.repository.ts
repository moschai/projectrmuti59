import { EntityRepository, Repository } from "typeorm";
import { fte_authority } from "./authority.entity";
import * as bcrypt from "bcrypt";
import { CreateAuthorityDto } from "./dto/create-authority.dto";
import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { AuthorityAuthDto } from "src/auth/dto/authority-login.dto";
import { fte_major } from "./major.entity";

@EntityRepository(fte_authority)
export class AuthorityRepository extends Repository<fte_authority> {
  async createAuthority(
    createAuthorityDto: CreateAuthorityDto,
    major: fte_major
  ) {
    const { username, password } = createAuthorityDto;
    const authority = new fte_authority();
    authority.username = username;
    authority.major = major;
    authority.faculty = major.faculty;
    authority.name_authority = createAuthorityDto.name_authority;
    authority.surname_authority = createAuthorityDto.surname_authority;
    authority.position_authority = createAuthorityDto.position_authority;
    authority.salt = await bcrypt.genSalt();
    authority.password = await this.hashPassword(password, authority.salt);
    try {
      return await authority.save();
    } catch (error) {
      if (error.sqlState === "23000") {
        throw new ConflictException("Username already exists");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async validateAuthorityPassword(authorityAuthDto: AuthorityAuthDto) {
    const { username, password } = authorityAuthDto;
    const authority = await this.findOne({
      where: { username },
      relations: ["faculty"],
      select: [
        "username",
        "password",
        "salt",
        "id_authority",
        "name_authority",
        "surname_authority",
        "position_authority",
      ],
    });
    if (authority && (await authority.validatePassword(password))) {
      return authority;
    } else {
      return undefined;
    }
  }
}
