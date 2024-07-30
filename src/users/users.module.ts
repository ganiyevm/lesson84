import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from '../common/strategies';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from '../common/guards';

@Module({
  imports: [JwtModule.register({}), PrismaModule],
  providers: [
    UsersService,
    AccessTokenStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
