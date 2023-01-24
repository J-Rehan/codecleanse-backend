import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from "@nestjs/common";
  import { Response } from "express";
import { codes } from "./codes";
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const exception_type = exception instanceof HttpException ? "http" : "other";
      const status =
      exception_type == "http" ? exception.getStatus() : codes.INTERNAL_SERVER_ERROR;
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<any>();
      const timestamp = new Date().toISOString();
      if (exception_type == "http") {
        const eres = exception.getResponse();
        console.log(
          `***JobId=${request.job_id}*** , ***Method=${request.method}***, ***Url=${request.url
          }*** failed at ${timestamp} with status ${status} message ${exception.message
          } body ==> ${JSON.stringify(request.body)} params ==> ${JSON.stringify(
            request.params
          )} query ==> ${JSON.stringify(
            request.query
          )}`,
          eres
        );
        response.status(status).json({
          statusCode: status,
          timestamp: timestamp,
          path: request.url,
          message: exception.message,
          error: eres,
          job_id: request.job_id,
        });
  
       
        
      } else {
        console.log(
          `***JobId=${request.job_id}*** , ***DeviceId=${request.headers.device_id
          }***, ${request.method} ${request.url
          } failed at ${timestamp} with code ${status} message ${exception.message
          } body ==> ${JSON.stringify(request.body)} params ==> ${JSON.stringify(
            request.params
          )}`,
          exception
        );
        response.status(codes.INTERNAL_SERVER_ERROR).json({
          statusCode: 500,
          timestamp: timestamp,
          path: request.url,
          message: "something went wrong",
          error: exception,
          job_id: request.job_id,
        });
  
      }
    }
  
  }
  