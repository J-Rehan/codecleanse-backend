import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ExceptionHandler } from 'src/common/exceptions/handler';
import { LoggerService } from 'src/common/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, ExceptionHandler, LoggerService]
})
export class UsersModule {}
