import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private UserService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {

        const user = await this.UserService.findByEmail({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(
            password, 
            user.password
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };

        return { access_token: this.jwtService.sign(payload) };
    }
}
