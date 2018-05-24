import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  doFinduser() {
    this.authService.findUserAccount(this.form.value)
      .subscribe(
        resp => {
            this.account = resp;
        },
        err => {

        }
      );
  }

  doReset() {

  }

}
