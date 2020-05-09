import { IsNumber, IsString, MaxLength } from "class-validator";

export class TenTableDto {
    @IsNumber()
    idstructure: number;

    @IsString()
    @MaxLength(128)
    namestructure: string;

    @IsNumber()
    unitstructure: number;

    @IsNumber()
    idcompare: number;

    @IsString()
    @MaxLength(128)
    namecompare: string;

    @IsNumber()
    unitcompare: number;

    @IsNumber()
    advisor: number
}