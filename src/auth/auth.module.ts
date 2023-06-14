import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { DatabaseModule } from "src/database/database.module";
import { DatabaseService } from "src/database/database.service";
import { AuthService } from "./auth.service";

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, DatabaseService],
})
export class AuthModule {}