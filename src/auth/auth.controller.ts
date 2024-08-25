import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './localAuth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // валидация имейла и пароля проходит в local auth guard
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    description: 'log in with email and password to get jwt token'
  })
  @ApiUnauthorizedResponse({
    description: 'Returns 401 if user not found or login failed'
  })
  @ApiResponse({
    status: 201,
    description: 'Returns jwt token as result'
  })
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }
}