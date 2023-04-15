import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { customAlphabet } from 'nanoid';
import { EnvService } from '../../core/env.service';
import { NonceDto } from '../model/dto/nonce.dto';

@Injectable()
export class NonceService {
  private readonly logger: Logger = new Logger(NonceService.name);
  private readonly customNanoId = customAlphabet('1234567890', 8);
  constructor(
    private readonly envService: EnvService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  /**
   * Generate nonce for user
   *
   * @param address Wallet address
   * @returns Nonce
   */
  public async generateNonceForUser(address: string): Promise<NonceDto> {
    this.logger.debug(`Generate new nonce for address ${address}`);
    const nonce = this.customNanoId();
    await this.redis.set(
      `nonce:address:${address}`,
      nonce,
      'EX',
      this.envService.nonceTtl,
    );
    return new NonceDto(Number(nonce));
  }

  /**
   * Clear nonce by user
   *
   * @param address Address
   */
  public async clearNonceByUser(address: string): Promise<void> {
    this.redis.del(`nonce:address:${address}`);
  }

  /**
   * Get current nonce of user
   *
   * @param address Wallet address
   * @returns Current nonce
   */
  public async getCurrentNonceOfUser(address: string): Promise<string> {
    return await this.redis.get(`nonce:address:${address}`);
  }
}
