import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChallengeDto {
  @ApiProperty({
    name: 'address',
    required: true,
    example: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  })
  @IsNotEmpty({
    message: 'Address can not empty',
  })
  address: string;
}
