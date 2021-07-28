import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/Users';
import { Repository } from 'typeorm';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //jwt 전략
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //헤더의 토큰으로 추출
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false, //만료기간 없음
    });
  }
  async validate(payload) {
    const user = this.usersRepository.findOne({
      where: { id: payload.sub },
    });
    if (!user) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
    return user;
  } // 클라이언트에서 날라온 토큰에대해 유효성 검증
}
