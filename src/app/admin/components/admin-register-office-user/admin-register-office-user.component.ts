import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {OfficeService} from '../../../services/office.service';
import {Account} from '../../../models/account';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';
declare var $;
@Component({
  selector: 'app-admin-register-office-user',
  templateUrl: './admin-register-office-user.component.html',
  styleUrls: ['./admin-register-office-user.component.css']
})
export class AdminRegisterOfficeUserComponent implements OnInit {

  form = new FormGroup({
    first_name : new FormControl(),
    last_name : new FormControl(),
    username: new FormControl(),
  });

  constructor(
    private officeService: OfficeService,
    private authService: AuthService,
    private notifier: NotificationService) { }

  ngOnInit() {
    this.officeService.getOffices()
      .subscribe(
        resp => {

          let options = `
            <option disabled selected>Select office</option>
          `;

          for (let i = 0; i < resp.length; i++) {
            options += `<option value="${resp[i].name}">${resp[i].name}</option>`;
          }
          $('#offices').html(options);
          $('select').formSelect();
        },
        err => {

        }
      );
  }

  doRegisterOfficeUser() {
    const account: Account = this.form.value;
    account.departmentId = $('#offices').val();
    account.email = this.form.value.username;
    account.user_role = 'office';
    account.password = 'jkl;';

    this.authService.addUserAccount(account)
      .subscribe(
        resp => {
          this.notifier.success('succesfully registered user', null);
        },
        err => {
          this.notifier.error('Error while registering user', null, err);
        }
      );
    // console.log(account);
  }

}
