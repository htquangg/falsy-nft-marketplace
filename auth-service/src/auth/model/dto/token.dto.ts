import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    name: 'token',
  })
  token: string;

  @ApiProperty({
    name: 'expireIn',
  })
  expireIn: string;
  constructor(token: string, expireIn: string) {
    this.token = token;
    this.expireIn = expireIn;
  }
}
