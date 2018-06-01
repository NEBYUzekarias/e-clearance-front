import { Component, OnInit } from '@angular/core';
import {OfficeService} from '../../../services/office.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../../models/account';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';
import {AccountService} from "../../../services/account.service";
import { appConfig } from '../../../app.config';

declare var $: any;

@Component({
  selector: 'app-admin-register-student',
  templateUrl: './admin-register-student.component.html',
  styleUrls: ['./admin-register-student.component.css']
})
export class AdminRegisterStudentComponent implements OnInit {
  form: FormGroup;

  constructor(
    private officesService: OfficeService,
    private authService: AuthService,
    private accountService: AccountService,
    private notifier: NotificationService
  ) { }

  ngOnInit() {
    // setup form text input controls
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^atr\/\d{4}\/\d{2}/),
      ]),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
    });

    // setup student departments for selecting choices
    this.officesService.getDepartments()
      .subscribe(
        resp => {
          let options = `
            <option disabled selected>Select department</option>
          `;
          for (let i = 0; i < resp.length; i++) {
            options += `<option value="${resp[i].name}">${resp[i].name}</option>`;
          }
          $('#departments').html(options);
          $('select').formSelect();
        }
      );
  }

  /**
   * resgister a new student
   */
  doRegisterStudent() {
    // setup account to be sent to backend
    const account: Account = this.form.value;
    account.user_role = appConfig.roles.STUDENT;
    account.departmentId = $('#departments').val();
    account.year = $('#year').val();
    account.password = this.accountService.generatePassword(account);

    this.accountService.addUserAccount(account)
      .subscribe(
        resp => {
          this.notifier.success('Successfully registered student', null);
        },
        err => {
          this.notifier.error(
            'Something went wrong trying to register student', null, err);
        }
      );

    console.log(account);
  }

}
