import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CoreModule } from '../core/core.module';
import { EnvService } from '../core/env.service';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { NonceService } from './service/nonce.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [CoreModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => {
        return {
          secret: envService.jwtSecret,
          signOptions: {
            expiresIn: envService.jwtExprirationTime,
          },
        };
      },
    }),
    CoreModule,
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, NonceService],
})
export class AuthModule {}
