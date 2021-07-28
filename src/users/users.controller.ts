import { ResponseJoinDto } from './dto/response.join.dto';
import { CurrentUser } from './../common/decorators/user.decorator';
import { RequestLoginDto } from './../auths/jwt/dto/request.login.dto';
import { AuthsService } from './../auths/auths.service';
import { SuccessInterceptor } from './../common/interceptors/success.interceptor';
import { UsersService } from './users.service';
import { RequestJoinDto } from './dto/request.join.dto';
import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseInterceptors,
  Get,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { JwtAuthGuard } from 'src/auths/jwt/jwt.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/users')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthsService,
  ) {}

  @Get('current')
  @UseGuards(JwtAuthGuard)
  getAllUserList() {
    return this.userService.getAllUserList();
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  getCurrentCat(@CurrentUser() cat) {
    return cat;
  }

  @Post('')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    type: ResponseJoinDto,
  })
  async join(@Body() data: RequestJoinDto) {
    await this.userService.join(data); //유저 중복시 Exception 발생
  }

  @Post('/login')
  login(@Body() data: RequestLoginDto) {
    return this.authService.jwtLogin(data);
  }
}
