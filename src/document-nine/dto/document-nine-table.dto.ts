import { IsOptional, IsNumber, IsString, MaxLength } from "class-validator";

export class NineTableDto {
  @IsOptional()
  @IsNumber()
  subjectno: number;

  @IsString()
  @MaxLength(128)
  namesubject: string;

  @IsString()
  @MaxLength(128)
  groupstudy: string;
}
