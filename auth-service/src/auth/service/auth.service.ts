import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EntityManager } from 'typeorm';
import Web3Token from 'web3-token';
import { EnvService } from '../../core/env.service';
import { AuthenticationDto } from '../model/dto/authentication.dto';
import { TokenDto } from '../model/dto/token.dto';
import { User } from '../model/entity/user.entity';
import { NonceService } from './nonce.service';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly envService: EnvService,
    private readonly jwtService: JwtService,
    private readonly nonceService: NonceService,
    private readonly entityManager: EntityManager,
  ) {}

  /**
   * Authenticate user
   *
   * @param authenticateDto Authentication dto
   * @returns Token
   */
  public async authenticate(
    authenticateDto: AuthenticationDto,
  ): Promise<TokenDto> {
    try {
      const address = await this.recoverSignerAddress(authenticateDto);

      let user: User;
      user = await this.entityManager.findOne(User, {
        where: {
          address,
        },
      });

      if (!user) {
        user = await this.entityManager.save(new User(address));
        this.logger.debug(`Create new user ${address}`);
      }

      const token = await this.jwtService.signAsync({
        address: user.address,
        sub: user.id,
      });

      return new TokenDto(token, this.envService.jwtExprirationTime);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  /**
   * Recover signer address from signature
   *
   * @param expectAddress Expect address
   * @param signature Signature EIP-4361
   * @returns Recovered address
   */
  public async recoverSignerAddress(
    authenticateDto: AuthenticationDto,
  ): Promise<string> {
    const currentNonce = await this.nonceService.getCurrentNonceOfUser(
      authenticateDto.address,
    );

    const { address } = Web3Token.verify(authenticateDto.signature, {
      domain: this.envService.trustedDomain,
      nonce: currentNonce,
    });

    return address;
  }
}
