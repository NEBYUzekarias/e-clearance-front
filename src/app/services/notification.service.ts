import {Injectable} from '@angular/core';

declare var M;

@Injectable()
export class NotificationService {
  error_classes = 'red darken-1';
  success_classes = 'green darken-1';
  info_classes = 'blue darken-1';
  warn_classes = 'orange darken-5';

  constructor() {
  }

  // success level notification
  success(message: string, options: object): void {
    M.toast({html: message, classes: this.success_classes});
    console.log('success:', message);
  }

  // error level notification
  error(message: string, options?: object, err?): void {
    if (err) {
      if (err.status === 0) {
        M.toast({html: 'Unable to connect', classes: this.error_classes});
      } else if (err.status === 400 && err.error.error.message === 'Clearance_Already_Submitted') {
        M.toast(
          {
            html: 'You have already submitted clearance for current semester',
            classes: this.warn_classes,
          }
        );
      } else if (message) {
        M.toast({html: message, classes: this.error_classes});
        console.log('message: ', message);
      } else {
        console.log('err object:', err);
      }
    }
  }

  // information level notification
  info(message: string, options: object): void {
    M.toast({html: message, classes: this.info_classes});
    console.log('info:', message);
  }
}
