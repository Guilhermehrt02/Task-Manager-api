import { Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() credentials: LoginDto) {
        return this.authService.validateUser(credentials.email, credentials.password);
    }
}
