import {
  IsNumber,
  IsString,
  MaxLength,
  IsOptional,
  MinLength,
  IsNumberString,
} from "class-validator";
import { isNumber } from "util";

export class SevenTableDto {
  @IsOptional()
  @IsNumber()
  subjectno: number;

  @IsString()
  id_subject: string;

  @IsString()
  @MaxLength(128)
  namesubject: string;

  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(255)
  statusg: string;

  @IsNumber()
  advisor: number;
}
