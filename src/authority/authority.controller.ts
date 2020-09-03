import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthorityService } from "./authority.service";
import { CreateAuthorityDto } from "./dto/create-authority.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator/user.decorator";
import { fte_authority } from "./authority.entity";

@Controller("authority")
export class AuthorityController {
  constructor(private authorityService: AuthorityService) {}

  @UseGuards(AuthGuard("jwt-authority"))
  @Get("/authority")
  getAuthorityFromToken(@GetUser() authority: fte_authority) {
    return this.authorityService.getAuthorityById(authority.id_authority);
  }

  @UseGuards(AuthGuard("jwt-admin"))
  @Post()
  createAuthority(
    @Body(new ValidationPipe()) createAuthorityDto: CreateAuthorityDto
  ) {
    return this.authorityService.createAuthority(createAuthorityDto);
  }

  // @UseGuards(AuthGuard('jwt-authority'))
  @Get()
  getAuthoritysAll() {
    return this.authorityService.getAuthoritysAll();
  }

  @Get("/major")
  getMajors() {
    return this.authorityService.getMajors();
  }

  @Get("/:majorId")
  getAuthorityByMajorId(@Param("majorId") majorId) {
    return this.authorityService.getAuthorityByMajorId(majorId);
  }
}
