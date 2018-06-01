import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../../services/account.service';
import {NotificationService} from '../../../services/notification.service';
import {Account} from "../../../models/account";

@Component({
  selector: 'app-reset-forgotten-password',
  templateUrl: './reset-forgotten-password.component.html',
  styleUrls: ['./reset-forgotten-password.component.css']
})
export class ResetForgottenPasswordComponent implements OnInit {

  account: Account;

  // checks if user is found or not, nothing to say if this is null
  userFound: boolean = null;

  // new successfully generated password
  generatedPassword: string = null;

  form = new FormGroup({
    username: new FormControl('', Validators.required)
  });

  constructor(private accountService: AccountService,
              private notifService: NotificationService) {
  }

  ngOnInit() {
  }

  findAccount() {
    const username = this.form.value.username.trim();
    if (username !== '' ) {
      this.accountService.findUserAccount(username)
        .subscribe(
          resp => {
            if (resp.length === 0) {
              this.userFound = false;
              this.account = null;
            } else if (resp.length === 1) {
              this.userFound = true;
              this.account = resp[0];
            } else {
              this.notifService.error(
                'More than one account match the username', null, null);
            }
          },
          err => {
            this.notifService.error(
              'Something went wrong trying to find user', null, err);
          }
        );
    }
  }

  /**
   * generate new password and update account password
   */
  generatePassword(): void {
    // generate new password for the account
    let newPassword = this.accountService.generatePassword(this.account);

    // update the new password for the account
    this.accountService.updatePassword(this.account, newPassword)
      .subscribe(
        resp => {
          if (resp['success']) {
            this.notifService.success('Password updated successfully');
            this.generatedPassword = newPassword;
          } else {
            this.generatedPassword = null;            
            this.notifService.error('Something went wrong trying to update password');
          }
        },
        err => {
          this.generatedPassword = null;
          this.notifService.error(
            'Something went wrong trying to update password', null, err);
        }
      );
  }

}
