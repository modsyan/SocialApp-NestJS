import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "dotenv";
import { Logger, ValidationPipe } from "@nestjs/common";

(async () => {
  config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );
  await app.listen(3000);
})();
