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
  @MaxLength(128)
  namesubject: string;

  @IsString()
  @MaxLength(128)
  groupstudy: string;

  // @IsString()
  // @MaxLength(255)
  // signature: string;

  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(255)
  note: string;

  @IsNumber()
  advisor: number;
}
