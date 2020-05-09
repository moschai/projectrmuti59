import { IsString, Length, IsNumber } from "class-validator";

export class CreateAuthorityDto {

    @IsNumber()
    major: number;

    @IsString()
    @Length(0, 50)
    username: string;

    @IsString()
    @Length(0, 50)
    password: string;

    @IsString()
    @Length(0, 50)
    name_authority: string;

    @IsString()
    @Length(0, 50)
    surname_authority: string;

    @IsString()
    @Length(0, 255)
    position_authority: string;
}