import { Injectable, Scope, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";

@Injectable({ scope: Scope.REQUEST })
export class LoggerService {
  constructor(@Inject(REQUEST) private request) {}

  getPrefix() {
    if (this?.request?.user) {
      let email = this.request.user?.email || this.request.user?.firebase_id;
      return `***JobId=${this.request.job_id}*** ${this.request.method} ${this.request.path} Email=${email} `;
    } else {
      return `***JobId=${this.request.job_id}*** ${this.request.method} ${this.request.path}`;
    }
  }

  printInfo(message: string) {
    console.log(`${this.getPrefix()} INFO: ${message}`);
  }
  printDebug(message: string) {
    console.log(`${this.getPrefix()} DEBUG: ${message}`);
  }
  printError(message) {
    console.log(`${this.getPrefix()} ERROR: ${message}`);
  }
  // this comes from try catch
  printCatchException(error) {
    console.log(`${this.getPrefix()} EXCEPTION: `, error);
  }
  printCatchMsgException(msg, error) {
    console.log(`${this.getPrefix()} EXCEPTION: ${msg}`, error);
  }
}
