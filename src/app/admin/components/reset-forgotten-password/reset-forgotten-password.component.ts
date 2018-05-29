import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-reset-forgotten-password',
  templateUrl: './reset-forgotten-password.component.html',
  styleUrls: ['./reset-forgotten-password.component.css']
})
export class ResetForgottenPasswordComponent implements OnInit {

  account: Account;

  form = new FormGroup({
    username: new FormControl('', Validators.required)
  });

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
  }

  findAccount() {
    this.accountService.findUserAccount(this.form.value)
      .subscribe(
        resp => {
          console.log('resp', resp);
          this.account = resp;
        },
        err => {
          console.log('err', err);
        }
      );
  }

  doReset() {

  }

}
