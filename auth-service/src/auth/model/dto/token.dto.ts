import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    name: 'token',
  })
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
