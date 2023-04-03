import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthenticationDto {
  @ApiProperty({
    name: 'address',
    required: true,
    example: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  })
  @IsNotEmpty({
    message: 'Address can not empty',
  })
  address: string;

  @ApiProperty({
    name: 'signature',
    required: true,
  })
  @IsNotEmpty({
    message: 'Signature can not empty',
  })
  signature: string;
}
