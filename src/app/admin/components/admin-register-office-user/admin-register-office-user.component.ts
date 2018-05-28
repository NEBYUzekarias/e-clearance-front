import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OfficeService} from '../../../services/office.service';
import {Account} from '../../../models/account';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';
import {AccountService} from "../../../services/account.service";

declare var $;

@Component({
  selector: 'app-admin-register-office-user',
  templateUrl: './admin-register-office-user.component.html',
  styleUrls: ['./admin-register-office-user.component.css']
})
export class AdminRegisterOfficeUserComponent implements OnInit {

  form: FormGroup;

  constructor(
    private officeService: OfficeService,
    private authService: AuthService,
    private accountService: AccountService,
    private notifService: NotificationService) { }

  ngOnInit() {
    // setup form text input controls
    this.form = new FormGroup({
      first_name : new FormControl('', Validators.required),
      last_name : new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
    });

    // setup office choices to be selected in form
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
          this.notifService.error(
            'Something went wrong while fetching offices', null, err);
        }
      );
  }

  /**
   * register a new office user account
   */
  doRegisterOfficeUser() {
    // set up account to be send to backend
    const account: Account = this.form.value;
    account.departmentId = $('#offices').val();
    account.user_role = 'office';
    account.password = this.accountService.generatePassword(account);

    this.accountService.addUserAccount(account)
      .subscribe(
        resp => {
          this.notifService.success('Successfully registered user', null);
        },
        err => {
          console.log('err', err);
          this.notifService.error(
            'Something went wrong trying to register user', null, err);
        }
      );
  }
}
