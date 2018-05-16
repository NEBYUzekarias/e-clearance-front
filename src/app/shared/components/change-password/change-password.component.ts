import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';

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

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  doChangePassword(){

    this.authService.changePassword(this.form.value)
      .subscribe(
        resp =>{
          this.notificationService.info('Successfully changed the password', null)
        },
        err =>{
          this.notificationService.error('Error: password not changed', null)
        }
      )

  }

}
