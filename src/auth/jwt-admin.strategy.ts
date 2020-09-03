import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminRepository } from "src/admin/admin.repository";
import { secret } from "src/config/secret.config";

@Injectable()
export class JwtAdminStratygy extends PassportStrategy(Strategy, "jwt-admin") {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload) {
    const user = await this.adminRepository.findOne({
      username: payload.username,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
