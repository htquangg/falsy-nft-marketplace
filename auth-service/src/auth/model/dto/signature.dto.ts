import { ApiProperty } from '@nestjs/swagger';

export class SignatureDto {
  @ApiProperty({
    name: 'signature',
  })
  signature: string;

  constructor(signature: string) {
    this.signature = signature;
  }
}
