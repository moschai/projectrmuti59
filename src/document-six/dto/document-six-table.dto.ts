import {
  IsNumber,
  IsString,
  MaxLength,
  IsOptional,
  MinLength,
} from "class-validator";

export class SixTableDto {
  @IsNumber()
  @IsOptional()
  subjectno: number;

  @IsString()
  id_subject: string;

  @IsString()
  @MaxLength(128)
  namesubject: string;

  @IsString()
  @MaxLength(128)
  groupstudy: string;

  // @IsString()
  // @MaxLength(255)
  // signature: string;

  @IsNumber()
  advisor: number;
}
