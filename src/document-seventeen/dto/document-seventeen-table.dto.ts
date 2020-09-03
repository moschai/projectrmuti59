import { IsNumber, IsString, MaxLength, IsOptional } from "class-validator";

export class SeventeenTableDto {
  @IsOptional()
  @IsNumber()
  subjectno: number;

  @IsString()
  id_subject: string;

  @IsString()
  @MaxLength(128)
  namesubject: string;

  @IsString()
  @MaxLength(255)
  groupsub: string;

  @IsString()
  @MaxLength(255)
  groupsubstruct: string;
}
