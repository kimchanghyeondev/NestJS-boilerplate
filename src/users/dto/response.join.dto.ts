import { ApiProperty } from '@nestjs/swagger';
export class ResponseJoinDto {
  @ApiProperty({
    example: '1',
    description: 'userId',
  })
  id: number;

  @ApiProperty({
    example: 'test',
    description: 'username',
  })
  username: string;

  @ApiProperty({
    example: '2021-07-27T07:31:27.229Z',
    description: 'createdAt',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2021-07-27T07:31:27.229Z',
    description: 'createdAt',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2021-07-27T07:31:27.229Z',
    description: 'if null -> is not deleted',
  })
  deletedAt: Date | null;
}
