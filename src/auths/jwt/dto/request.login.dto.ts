import { IsString, IsNotEmpty } from 'class-validator';
export class RequestLoginDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
