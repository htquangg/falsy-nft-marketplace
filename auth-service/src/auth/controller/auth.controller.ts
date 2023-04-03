import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationDto } from '../model/dto/authentication.dto';
import { ChallengeDto } from '../model/dto/challenge.dto';
import { NonceDto } from '../model/dto/nonce.dto';
import { TokenDto } from '../model/dto/token.dto';
import { AuthService } from '../service/auth.service';
import { NonceService } from '../service/nonce.service';

@ApiTags('Authenticate')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly nonceService: NonceService,
  ) {}

  @ApiOperation({
    summary: 'Challenge user nonce',
  })
  @ApiBody({
    type: ChallengeDto,
    required: true,
  })
  @ApiResponse({
    type: NonceDto,
    status: '2XX',
  })
  @Post('challenge')
  public async challengeNonce(
    @Body() request: ChallengeDto,
  ): Promise<NonceDto> {
    return this.nonceService.generateNonceForUser(request.address);
  }

  @ApiOperation({
    summary: 'Login',
  })
  @ApiBody({
    type: AuthenticationDto,
    required: true,
  })
  @ApiResponse({
    type: TokenDto,
    status: '2XX',
  })
  @Post('login')
  public async login(
    @Body() authenticationDto: AuthenticationDto,
  ): Promise<TokenDto> {
    return this.authService.authenticate(authenticationDto);
  }
}
