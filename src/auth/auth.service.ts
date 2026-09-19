import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email }});
        if (!user) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        const isPasswordVaild = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordVaild) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        const payload = { sub: user.id, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                nickname: user.nickname,
            },
        };
    }
}
