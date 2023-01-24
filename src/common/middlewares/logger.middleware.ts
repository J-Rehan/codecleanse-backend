import { Injectable, NestMiddleware, Request as Req } from "@nestjs/common";
import { Response } from "express";
import { Md5 } from "ts-md5";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(@Req() req, res: Response, next: Function) {
    const timestamp = new Date().toISOString();
    let str_ = `path=${req.path}&method=${req.method}&query=${JSON.stringify(
      req.query
    )}&time=${Date.now()}`;
    let job_id = Md5.hashStr(str_);

    if (req.user?.uid) {
      job_id = req.user?.uid;
    }
    if (req.method == "POST" && req.body) {
      req.body.job_id = job_id;
    }
    req.job_id = job_id;

    console.log(
      `Request recieved at ${timestamp} method ${req.method} url ${
        req.url
      }, assigned job_id ${job_id}, body ==> ${JSON.stringify(
        req.body
      )} params ==> ${JSON.stringify(req.params)} query ==> ${JSON.stringify(
        req.query
      )}`
    );

    res.on("close", () => {
      const { statusCode, statusMessage } = res;
      const timestamp = new Date().toISOString();

      console.log(
        `**JobId=${job_id}** Request returned at ${timestamp} method = ${
          req.method
        } url = ${
          req.url
        } status = ${statusCode},  message ==> ${JSON.stringify(statusMessage)}`
      );
    });

    next();
  }
}
