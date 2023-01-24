import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { ExceptionHandler } from 'src/common/exceptions/handler';
import { LoggerService } from 'src/common/logger/logger.service';
import { Application } from './entities/application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ExceptionHandler, LoggerService]
})
export class ApplicationsModule {}
