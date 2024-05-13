import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { LoginDto } from '@/dto/Auth/LoginDto';
import { MeService } from '@/services/auth/MeService';
import { LoginService } from '@/services/auth/LoginService';
import { LogoutService } from '@/services/auth/LogoutService';

import type { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly meService: MeService,
        private readonly loginService: LoginService,
        private readonly logoutService: LogoutService
    ) {}

    @Get('/me')
    me(@Req() req: Request) {
        return this.meService.handle(req);
    }

    @Post('/login')
    login(
        @Body()
        dto: LoginDto,
        @Req() req: Request
    ) {
        return this.loginService.handle(dto, req);
    }

    @Post('/logout')
    logout(@Req() req: Request) {
        return this.logoutService.handle(req);
    }
}
