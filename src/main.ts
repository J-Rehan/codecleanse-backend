import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { ValidationPipe } from "@nestjs/common";
import * as bodyParser from "body-parser";
import { HttpExceptionFilter } from "./common/exceptions/http-exception-filter";

dotenv.config({
  path: resolve(__dirname, `../.environments/.env.${process.env.NODE_ENV}`),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("CodeCleanse App")
    .setDescription("The CC app API description")
    .setVersion("1.0")
    .addTag("cc")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
