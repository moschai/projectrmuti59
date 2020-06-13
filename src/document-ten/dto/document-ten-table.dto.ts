import { IsNumber, IsString, MaxLength, IsNumberString } from "class-validator";

export class TenTableDto {
  // @IsString()
  // subject: string;

  @IsString()
  idcompare: string;

  @IsString()
  @MaxLength(128)
  namecompare: string;

  @IsNumber()
  unitcompare: number;

  @IsNumber()
  advisor: number;
}
