import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/user.model';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    // используется Guard'ом для проверки логинопароля в /auth/login 
    async validateUser(email: string, pass: string): Promise<User | null> {
        const user = await this.usersService.findUserByEmail(email);

        if(user === null) return null;

        const isSamePassword = await bcrypt.compare(pass, user.password);

        if (!isSamePassword) {
            throw new UnauthorizedException('Invalid password')
        }

        return user;
    }

    // используется для непосредственной регистрации и выдачи jwt токена
    async signIn(user: User): Promise<{ access_token: string }> {
        const payload = { sub: user.id, username: user.nickname };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}