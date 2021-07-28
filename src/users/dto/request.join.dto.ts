import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RequestJoinDto {
  @ApiProperty({
    example: 'test',
    description: 'username',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public password: string;
}
