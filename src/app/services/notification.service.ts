import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  constructor() { }

  // success level notification
  success(message: string, options: object): void {
    console.log("success:", message);
  }

  // error level notification
  error(message: string, options?: object, err?): void {
    console.log("error:", message);
    if (err) {
      console.log("err object:", err);
    }
  }

  // information level notification
  info(message: string, options: object): void {
    console.log("info:", message);
  }
}
