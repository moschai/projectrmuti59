import {
  IsString,
  MaxLength,
  Length,
  IsInt,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsObject,
  IsNumber,
  IsNumberString,
  IsOptional,
  MinLength,
} from "class-validator";
import { Type } from "class-transformer";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateSubjectDto {
  @IsString()
  @MaxLength(100)
  id_subject: string;

  @IsString()
  @MaxLength(255)
  name_subject: string;

  @IsNumberString()
  unit_subject: number;
}
