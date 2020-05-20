import { IsNumber, IsString, MaxLength, Length, IsInt } from "class-validator";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentThirteenDto {
    @IsNumber()
    certificatesuccess: number;

    @IsNumber()
    certificateregister: number;

    @IsNumber()
    diplomalvone: number;

    @IsNumber()
    diplomalvpwch: number;

    @IsNumber()
    diplomalvpwc: number;

    @IsNumber()
    diplomaptee: number;

    @IsNumber()
    diplomaptro: number;

    @IsNumber()
    loststudentcard: number;

    @IsNumber()
    damagedstudentcard: number;

    @IsNumber()
    samestudentcard: number;

    @IsNumber()
    certificateunit: number;

    @IsNumber()
    transcriptlvone: number;

    @IsNumber()
    transcriptlvtwo: number;

    @IsNumber()
    otherstatus: number;

    @IsString()
    @MaxLength(128)
    othermassege: string;

    @IsNumber()
    thaiversioncs: number;

    @IsNumber()
    amountthcs: number;

    @IsNumber()
    amountengcs: number;

    @IsNumber()
    engversioncs: number;

    @IsNumber()
    thaiversioncr: number;

    @IsNumber()
    amountthcr: number;

    @IsNumber()
    thaiversiontclvone: number;

    @IsNumber()
    amountthtclvone: number;

    @IsNumber()
    amountengtclvone: number;

    @IsNumber()
    engversiontclvone: number;

    @IsNumber()
    thaiversiontclvtwo: number;

    @IsNumber()
    amountthtclvtwo: number;

    @IsNumber()
    amountengtclvtwo: number;

    @IsNumber()
    engversiontclvtwo: number;

    @IsNumber()
    thaiversiondlvone: number;

    @IsNumber()
    amountthdlvone: number;

    @IsNumber()
    amountengdlvone: number;

    @IsNumber()
    engversiondlvone: number;

    @IsNumber()
    thaiversiondlvtwo: number;

    @IsNumber()
    amountthdlvtwo: number;

    @IsNumber()
    amountengdlvtwo: number;

    @IsNumber()
    engversiondlvtwo: number;

    @IsNumber()
    thaiversioncu: number;

    @IsNumber()
    amountthcu: number;

    @IsNumber()
    thaiversionotms: number;

    @IsNumber()
    amountthotms: number;

    //ส่วนของ นักศึกษา
    @IsString()
    @MaxLength(50)
    name_std: string;

    @IsString()
    @MaxLength(50)
    surname_std: string;

    @IsString()
    @Length(13, 13)
    id_std: string;

    @IsString()
    @Length(10, 10)
    phone_std: string;

    @IsNumber()
    lveducation: LevelEducation;

    @IsNumber()
    id_major: number;

    @IsInt()
    studentt_id: number;


}