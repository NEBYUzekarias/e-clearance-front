import { Component, OnInit } from '@angular/core';
import {OfficeService} from '../../../services/office.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Account} from '../../../models/account';
import {AuthService} from '../../../services/auth.service';
import {NotificationService} from '../../../services/notification.service';
import {AccountService} from "../../../services/account.service";
declare var $: any;
@Component({
  selector: 'app-admin-register-student',
  templateUrl: './admin-register-student.component.html',
  styleUrls: ['./admin-register-student.component.css']
})
export class AdminRegisterStudentComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    email: new FormControl()
  });
  constructor(
    private officesService: OfficeService,
    private authService: AuthService,
    private accountService: AccountService,
    private notifier: NotificationService
  ) { }

  ngOnInit() {
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

  doRegisterStudent() {
    const account: Account = this.form.value;
    account.user_role = 'student';
    account.departmentId = $('#departments').val();
    account.year = $('#year').val();
    account.password = 'jkl;';

    this.accountService.addUserAccount(account)
      .subscribe(
        resp => {
          this.notifier.success('Succesfully registered', null);
        },
        err => {
          this.notifier.error('Error while registering student', err);
        }
      );

    console.log(account);
  }

}
