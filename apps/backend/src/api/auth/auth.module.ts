import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from '@api/auth/auth.controller';
import { AuthService } from '@api/auth/auth.service';
import { AuthGuard } from '@api/auth/guards/auth.guard';
import { LocalStrategy, JwtStrategy } from '@api/auth/strategies';
import { UsersModule } from '@api/profile/profile.module';
import { envs } from '@common/config/envs';

import { Auth } from './auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: envs.JWT_SECRET,
      signOptions: {
        expiresIn: envs.JWT_EXPIRES_IN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
