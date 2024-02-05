import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { PrismaService } from './Prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './Prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BookModule,
    AuthModule,
    PrismaModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
