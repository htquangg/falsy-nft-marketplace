import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  databaseHost: string;

  databasePort: number;

  databaseName: string;

  databaseUsername: string;

  databasePassword: string;

  redisUrl: string;

  nonceTtl: number;

  trustedDomain: string;

  jwtSecret: string;

  jwtExprirationTime: string;

  constructor(private readonly configService: ConfigService) {
    this.databaseHost = this.configService.get<string>('DATABASE_HOST');
    this.databasePort = this.configService.get<number>('DATABASE_PORT') || 5432;
    this.databaseName = this.configService.get<string>('DATABASE_NAME');
    this.databaseUsername = this.configService.get<string>('DATABASE_USERNAME');
    this.databasePassword = this.configService.get<string>('DATABASE_PASSWORD');
    this.redisUrl = this.configService.get<string>('REDIS_URL');
    this.nonceTtl = this.configService.get<number>('NONCE_TTL');
    this.trustedDomain = this.configService.get<string>('TRUSTED_DOMAIN');
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
    this.jwtExprirationTime = this.configService.get<string>(
      'JWT_EXPRIRATION_TIME',
    );
  }
}
