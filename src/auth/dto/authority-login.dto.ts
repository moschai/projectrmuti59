import { CreateAuthorityDto } from "src/authority/dto/create-authority.dto";
import { IsString, Length } from "class-validator";

export class AuthorityAuthDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
