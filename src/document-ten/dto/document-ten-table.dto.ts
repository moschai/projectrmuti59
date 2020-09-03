import { IsNumber, IsString, MaxLength, IsNumberString } from "class-validator";

export class TenTableDto {
  // @IsString()
  // subject: string;

  @IsString()
  @MaxLength(128)
  namecompare: string;

  @IsNumber()
  unitcompare: number;

  @IsString()
  id_subject: string;

  @IsString()
  id_subjectnew: string;

  @IsNumber()
  advisor: number;
}
