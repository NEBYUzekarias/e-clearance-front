import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required)
  });

  constructor(private accountService: AccountService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  changePassword(): void {
    this.accountService.changePassword(this.form.value)
      .subscribe(
        resp => {
          console.log('resp', resp);
          this.notificationService.success('Successfully changed the password', null);
        },
        err => {
          this.notificationService.error('Error: Password not changed', null, err);
        }
      );
  }

}
