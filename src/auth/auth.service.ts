import { ForbiddenException, Injectable } from '@nestjs/common';
import { Signin, Signup } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/Prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { config } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: Signup) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          password: hash,
          name: dto.name,
        },
      });

      delete user.password;
      delete user.token;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Username sudah terdaftar !!');
        }
      }
      throw error;
    }
  }

  async signin(dto: Signin) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (!user) {
      throw new ForbiddenException('username tidak ada !!');
    }

    const passwordCek = await argon.verify(user.password, dto.password);

    if (!passwordCek) {
      throw new ForbiddenException('Password salah !');
    }

    delete user.password;
    return user;
  }

  signToken(userId: number, username: string): Promise<string> {
    const payload = {
      sub: userId,
      username,
    }

    const secret = this.config.get("JWT_SECRET")

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    })
  }
}
