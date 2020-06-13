import {
  IsNumber,
  IsString,
  MaxLength,
  Length,
  IsOptional,
  MinLength,
} from "class-validator";

export class SeventeenTableDto {
  @IsNumber()
  @IsOptional()
  studentno: number;

  @IsString()
  idstudent: string;

  @IsString()
  @MaxLength(128)
  namestudent: string;

  @IsString()
  @MaxLength(128)
  surnamestudent: string;

  @IsNumber()
  namemajor: number;

  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(255)
  note: string;
}
