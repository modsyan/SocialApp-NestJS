import { Body, Controller, Post, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginDto, UserRegisterDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post("Login")
  login(@Body() dto: UserLoginDto) {
    return this._authService.login(dto);
  }

  @Post("Register")
  register(@Body() dto: UserRegisterDto) {
    return this._authService.register(dto);
  }
}
