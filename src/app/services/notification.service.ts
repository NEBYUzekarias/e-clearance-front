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
    if (err) {
      if (err.status === 0) {
        console.log("Unable to connect");
      }
      console.log("err object:", err);
    }

    if (message) {
      console.log('message: ', message);
    }
  }

  // information level notification
  info(message: string, options: object): void {
    console.log("info:", message);
  }
}
