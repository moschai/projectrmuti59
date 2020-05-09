import { IsNumber, IsString, MaxLength } from "class-validator";

export class SeventeenTableDto {

    @IsNumber()
    studentno: number;

    @IsNumber()
    idstudent: number;

    @IsNumber()
    subjectno: number;

    @IsString()
    @MaxLength(128)
    namestudent: string;

    @IsString()
    @MaxLength(128)
    surnamestudent: string;

    @IsString()
    @MaxLength(128)
    namemajor: string;

    @IsString()
    @MaxLength(255)
    note: string;
}