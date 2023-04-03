import { ApiProperty } from '@nestjs/swagger';

export class NonceDto {
  @ApiProperty({
    name: 'nonce',
    example: 'V1StGXR8_Z5jdHi6B-myT',
  })
  nonce: string;
  constructor(nonce: string) {
    this.nonce = nonce;
  }
}
