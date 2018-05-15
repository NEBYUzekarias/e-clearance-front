import { Injectable } from '@angular/core';

declare var M;

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
        M.toast('html', "Unable to connect");
      } else {
        console.log("err object:", err);
      }
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
