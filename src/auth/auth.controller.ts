import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Signin, Signup } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: Signup) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: Signin) {
    return this.authService.signin(dto);
  }
}
