import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AdminAuthDto } from "./dto/admin-login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminRepository } from "src/admin/admin.repository";
import { Admin } from "@nestjs/common/interfaces/external/kafka-options.interface";
import { fte_admin } from "src/admin/admin.entity";
import { fte_authority } from "src/authority/authority.entity";
import { JwtService } from "@nestjs/jwt";
import { AuthorityAuthDto } from "./dto/authority-login.dto";
import { AuthorityRepository } from "src/authority/authority.repository";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepo: AdminRepository,
    private authorityRepo: AuthorityRepository,
    private jwtService: JwtService
  ) {}

  async adminAuth(adminAuthDto: AdminAuthDto): Promise<any> {
    const adminResponse = await this.adminRepo.validateAdminPassword(
      adminAuthDto
    );
    if (adminResponse) {
      return await this.genAccessToken(adminResponse);
    } else {
      throw new UnauthorizedException("Invalid username or password.");
    }
  }

  async authorityAuth(authorityAuthDto: AuthorityAuthDto): Promise<any> {
    const authorityResponse = await this.authorityRepo.validateAuthorityPassword(
      authorityAuthDto
    );
    if (authorityResponse) {
      return await this.genAccessToken(authorityResponse);
    } else {
      throw new UnauthorizedException("Invalid username or password.");
    }
  }

  async genAccessToken(user: fte_admin | fte_authority) {
    const { password, salt, ...payload } = user;

    const accessToken = await this.jwtService.sign(payload);
    return { accessToken, user: payload };
  }
}
