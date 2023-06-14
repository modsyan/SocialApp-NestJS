import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { UserLoginDto, UserRegisterDto } from "./dto";
import * as bcrypt from "bcrypt";
import { isObjectLiteralElementLike } from "typescript";
import { ok } from "assert";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(private _dbContext: DatabaseService) {}

  async login(dto: UserLoginDto) {
    const { email, password } = dto;

    const user: User | null = await this._dbContext.user.findFirst({
      where: { email: email }
    });

    if (!user) {
      throw new NotFoundException(
        user,
        `user with email ${email} not found, please try again.`
      );
    }
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch)
      throw new UnauthorizedException();

    return {
      success: true,
      message: "Login Successfully",
      data: {user}
    };
  }

  async register(dto: UserRegisterDto) {
    const { email, username, firstName, lastName, password } = dto;
    //TODO: helper to validate environment variables
    // const salt = process.env.PASSWORD_SALT;

    const hashPassword = bcrypt.hashSync(password, 16);

    const user = await this._dbContext.user.create({
      data: {
        username,
        password: hashPassword,
        email,
        firstName,
        lastName
      }
    });

    return {
      success: true,
      message: "User has been created successfully",
      data: { user }
    };
  }
}
