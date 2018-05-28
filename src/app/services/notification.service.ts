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
      // assume error notification can be handled
      // from err object info
      let handled_from_err = true;

      // weird loopback error object we need of
      const error = err.error.error;

      if (err.status === 0) {
        M.toast({html: 'Unable to connect', classes: this.error_classes});
      } else if (err.status === 400) {
        if (error.message === 'Clearance_Already_Submitted') {
          // in case of when trying to sumbit a clearance while
          // a clearance is submtitted for the current year and semeter
          // by a student
          M.toast(
            {
              html: 'You have already submitted clearance for current semester',
              classes: this.warn_classes,
            }
          );
        } else if (error.message === 'Invalid current password') {
          // when giving invalid old password to change to new password
          M.toast(
            {
              html: 'You provided wrong password for current password',
              classes: this.error_classes,
            }
          );
        } else {
          // could not handle error notification from err object info
          handled_from_err = false;
        }
      } else if (err.status === 401) {
        if (error.message === 'login failed') {
          // login failed with bad credentials most probably
          M.toast(
            {
              html: 'Username or password incorrect',
              classes: this.error_classes,
            }
          );
        } else {
          handled_from_err = false;
        }
      } else if (err.status === 422) {
        let codes = error.details.codes;
        if (codes.username && codes.username.indexOf('uniqueness') !== -1) {
          M.toast(
            {
              html: 'A user with the same username already exists',
              classes: this.error_classes,
            }
          );
        } else {
          handled_from_err = false;
        }
      } else {
        // could not handle error notification from err object info
        handled_from_err = false;
      }

      if (!handled_from_err) {
        if (message) {
          M.toast({html: message, classes: this.error_classes});
          console.log('message: ', message);
        } else {
          console.log('err object:', err);
        }
      }
    }
  }

  // information level notification
  info(message: string, options: object): void {
    M.toast({html: message, classes: this.info_classes});
    console.log('info:', message);
  }
}
