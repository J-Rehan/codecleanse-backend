import {
    ConflictException,
    HttpException,
    Injectable,
    NotFoundException,
  } from "@nestjs/common";
import { LoggerService } from "../logger/logger.service";
import { codes } from "./codes";

  @Injectable()
  export class ExceptionHandler {
    constructor(private readonly logService: LoggerService) {}
    handler(error: any) {
      this.logService.printCatchException(error);
      let code = null;
      let msg = "unknown";
      if (typeof error == "number") {
        code = error;
      } else if (error.code && typeof error.code == "number") {
        code = error.code;
      } else {
        throw new HttpException(error, codes.INTERNAL_SERVER_ERROR);
      }
      if (error.message && typeof error.message == "string") {
        msg = error.message;
      }
      if (code == codes.NOT_FOUND) {
        throw new NotFoundException({ cause: error, description: msg });
      } else if (code == codes.CONFLICT) {
        throw new ConflictException({ cause: error, description: msg });
      } else {
        throw new HttpException(error, codes.INTERNAL_SERVER_ERROR);
      }
    }
  }
  