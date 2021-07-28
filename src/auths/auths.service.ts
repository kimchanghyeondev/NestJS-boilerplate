import { RequestLoginDto } from './jwt/dto/request.login.dto';
import { User } from 'src/entities/Users';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async jwtLogin(data: RequestLoginDto) {
    const { username, password } = data;
    const findUser = await this.userRepository.findOne({
      where: { username },
      select: ['id', 'password'],
    });

    if (!findUser) {
      throw new UnauthorizedException('아이디와 패스워드를 확인해주세요.');
    }
    const isSamePassword: boolean = await bcrypt.compare(
      password,
      findUser.password,
    );
    if (!isSamePassword) {
      throw new UnauthorizedException('아이디와 패스워드를 확인해주세요.');
    }
    const payload = { username: username, sub: findUser.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
