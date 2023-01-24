import {
    Injectable,
    NestMiddleware,
    Req,
    UnauthorizedException,
  } from "@nestjs/common";
  import * as passport from "passport";
  import { Response } from "express";
  import { messages } from "../exceptions/messages";
  
  @Injectable()
  export class ApiKeyAuthMiddleware implements NestMiddleware {
    use(@Req() req, res: Response, next: Function) {
      passport.authenticate(
        'headerapikey',
        { session: false },
        value => {
          if (value) {
            next();
          } else {
            throw new UnauthorizedException({
              cause: messages.INCORRECT_API_KEY,
              description: messages.INCORRECT_API_KEY
            });
          }
        },
      )(req, res, next);
    }
  }