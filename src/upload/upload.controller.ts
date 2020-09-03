import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
  Get,
  Res,
  Param,
} from "@nestjs/common";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { GetUser } from "src/auth/decorator/user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";

const editFileName = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void
) => {
  // const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");
  callback(null, `${"signature"}-${randomName}${Date.now()}${fileExtName}`);
};

@Controller("upload")
export class UploadController {
  @Post("signature")
  @UseGuards(AuthGuard("jwt-authority"))
  @UseInterceptors(
    FileInterceptor("signature", {
      storage: diskStorage({
        destination: "./files/signature",
        filename: editFileName,
      }),
      //   fileFilter: excelFileFilter,
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    })
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: UserVerificationRequirement
  ) {
    if (!file) {
      throw new BadRequestException("signature is required");
    }

    return {
      filename: file.filename,
    };
  }

  @Get("signature/:imagePath")
  seeUploadedFile(@Param("imagePath") image, @Res() res: Response) {
    return res.sendFile(image, { root: "./files/signature" });
  }
}
