import { IsNumber, IsString, MaxLength, IsOptional } from "class-validator";

export class EightTableDto {
  @IsNumber()
  @IsOptional()
  idsubject: number;

  @IsString()
  @MaxLength(128)
  namesubject: string;

  @IsString()
  @MaxLength(128)
  oldgroubstudy: string;

  // @IsString()
  // @MaxLength(255)
  // path_oldsignature: string;

  @IsString()
  @MaxLength(128)
  newgroupstudy: string;

  // @IsString()
  // @MaxLength(255)
  // path_newsignature: string;

  @IsNumber()
  advisor: number;
}
