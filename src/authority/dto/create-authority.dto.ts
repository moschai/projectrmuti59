import {
  IsString,
  Length,
  IsNumber,
  IsNumberString,
  IsOptional,
} from "class-validator";
import { EPositionAuthority } from "../enum/position-authority.enum";

export class CreateAuthorityDto {
  @IsNumberString()
  @IsOptional()
  major?: number;

  @IsNumberString()
  @IsOptional()
  faculty?: number;

  @IsString()
  @Length(0, 50)
  username: string;

  @IsString()
  @Length(0, 50)
  password: string;

  @IsString()
  @Length(0, 50)
  name_authority: string;

  @IsString()
  @Length(0, 50)
  surname_authority: string;

  @IsString()
  @Length(0, 255)
  position_authority: string;
}
