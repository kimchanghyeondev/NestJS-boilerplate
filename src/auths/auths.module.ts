import { User } from 'src/entities/Users';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3y' },
    }),
  ],
  providers: [AuthsService, JwtStrategy],
  exports: [AuthsService],
})
export class AuthsModule {}
