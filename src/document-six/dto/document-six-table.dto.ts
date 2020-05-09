import { IsNumber, IsString, MaxLength } from "class-validator";

export class SixTableDto {
    @IsNumber()
    subjectno: number;

    @IsString()
    @MaxLength(128)
    namesubject: string;

    @IsString()
    @MaxLength(128)
    groupstudy: string;

    // @IsString()
    // @MaxLength(255)
    // signature: string;

    @IsString()
    @MaxLength(255)
    note: string;

    @IsNumber()
    advisor: number
}