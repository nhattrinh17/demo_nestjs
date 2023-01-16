import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @Post('auth/login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        console.log(2);

        return this.authService.login(req.user);
    }

    @Get('auth/test')
    @UseGuards(JwtAuthGuard)
    getTest(@Request() req): string {
        return req.user;
    }
}
