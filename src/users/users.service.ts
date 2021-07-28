import { RequestJoinDto } from './dto/request.join.dto';
import { User } from './../entities/Users';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async join(data: RequestJoinDto) {
    const findUser = await this.userRepository.findOne({
      where: { username: data.username },
    });
    if (findUser) {
      throw new UnauthorizedException(
        `해당하는 유저${data.username}는 이미 존재합니다.`,
      );
    }
    const user = new User();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    user.username = data.username;
    user.password = hashedPassword;
    const savedUser = await this.userRepository.save(user);
    return await this.userRepository.findOne({
      where: { id: savedUser.id },
    });
  }

  async getAllUserList() {
    const userList = await this.userRepository
      .createQueryBuilder('user')
      .select(['user', 'auths.authName', 'auths.authDisplayName'])
      .leftJoin('user.auths', 'auths')
      .getMany();
    return userList;
  }
}
