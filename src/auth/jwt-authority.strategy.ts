import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorityRepository } from "src/authority/authority.repository";
import { secret } from "src/config/secret.config";

@Injectable()
export class JwtAuthorityStratygy extends PassportStrategy(Strategy, 'jwt-authority') {
    constructor(
        @InjectRepository(AuthorityRepository)
        private authorityRepository: AuthorityRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret
        })
    }

    async validate(payload) {
        const user = await this.authorityRepository.findOne({ username: payload.username })
        if (!user) {
            throw new UnauthorizedException();
        }
        return user
    }

}