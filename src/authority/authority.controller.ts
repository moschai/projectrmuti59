import { Controller, Get, Param, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthorityService } from './authority.service';
import { CreateAuthorityDto } from './dto/create-authority.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('authority')
export class AuthorityController {
    constructor(private authorityService: AuthorityService) {

    }

    @Post()
    createAuthority(@Body(new ValidationPipe()) createAuthorityDto: CreateAuthorityDto) {
        return this.authorityService.createAuthority(createAuthorityDto)
    }

    // @UseGuards(AuthGuard('jwt-authority'))
    @Get()
    getAuthoritysAll() {
        return this.authorityService.getAuthoritysAll();
    }

    @Get('/major')
    getMajors() {
        return this.authorityService.getMajors();
    }

    @Get('/:majorId')
    getAuthorityByMajorId(@Param('majorId') majorId) {
        return this.authorityService.getAuthorityByMajorId(majorId);
    }


}
