import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { EnvService } from './core/env.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [CoreModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => {
        return {
          type: 'postgres',
          host: envService.databaseHost,
          port: envService.databasePort,
          database: envService.databaseName,
          username: envService.databaseUsername,
          password: envService.databasePassword,
          entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
          // migrations: ['src/migration/**/*.ts'],
          useUTC: true,
          synchronize: true,
          logging: true,
          extra: {
            compress: true,
          },
        };
      },
    }),
    RedisModule.forRootAsync({
      imports: [CoreModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => {
        return {
          config: {
            url: envService.redisUrl,
            enableAutoPipelining: true,
          },
        };
      },
    }),
    CoreModule,
  ],
  controllers: [],
})
export class AppModule {}
