import { IsString, IsOptional, IsBoolean, IsNumber } from "class-validator";

export class AuthorityApprovedDto {
  @IsString()
  @IsOptional()
  comment?: string;

  @IsString()
  filename: string;

  @IsOptional()
  notApproved?: boolean;

  @IsOptional()
  otherapprove?: boolean;

  @IsString()
  @IsOptional()
  othercondition: string;

  @IsNumber()
  @IsOptional()
  selectcondition: number;

  @IsString()
  @IsOptional()
  otherapprovefive: string;

  @IsNumber()
  @IsOptional()
  selectapprovefive: number;

  @IsOptional()
  otherfivest?: boolean;

  @IsString()
  @IsOptional()
  otherapprovesix: string;

  @IsNumber()
  @IsOptional()
  selectapprovesix: number;

  @IsOptional()
  othersixst?: boolean;

  @IsNumber()
  @IsOptional()
  std_notorpass_activity: number;

  @IsNumber()
  @IsOptional()
  std_activityunit: number;

  @IsOptional()
  other_activityst?: boolean;

  @IsOptional()
  other_activitystone?: boolean;

  @IsOptional()
  other_activitysttwo?: boolean;

  @IsOptional()
  other_activitystthree?: boolean;

  @IsString()
  @IsOptional()
  commentone_activity: string;

  @IsString()
  @IsOptional()
  commenttwo_activity: string;

  @IsString()
  @IsOptional()
  commentthree_activity: string;
}
