import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationsModule } from './applications/applications.module';
import { UsersModule } from './users/users.module';


import { MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./common/config/config";
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { ApiKeyAuthMiddleware } from "./common/middlewares/keyauth.middleware";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
    }),
    ApplicationsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    
    consumer.apply(LoggerMiddleware).forRoutes("v1");
    consumer.apply(ApiKeyAuthMiddleware).forRoutes("v1");
    
  }
}
