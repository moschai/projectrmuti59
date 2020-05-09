import { Controller, Get, Param, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthorityService } from './authority.service';
import { CreateAuthorityDto } from './dto/create-authority.dto';

@Controller('authority')
export class AuthorityController {
    constructor(private authorityService: AuthorityService) {

    }

    @Post()
    createAuthority(@Body(new ValidationPipe()) createAuthorityDto: CreateAuthorityDto) {
        return this.authorityService.createAuthority(createAuthorityDto)
    }

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
