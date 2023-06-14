import { BadRequestException, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { UserLoginDto, UserRegisterDto } from "./dto";
import { User } from "@prisma/client";
import { last } from "rxjs";

@Injectable()
export class AuthService {
  constructor(private _dbContext: DatabaseService) {}

  login(dto: UserLoginDto) {
    const { email, password } = dto;
    // this._dbContext.user.create();
    return { data: dto };
  }

  register(dto: UserRegisterDto) {
    const { email, username, firstName, lastName, password } = dto;
   
    return dto;
  }
}
