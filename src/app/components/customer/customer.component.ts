import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {Account} from "../../models/account";
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  account: Account;

  roles = appConfig.roles;

  constructor(private authService: AuthService,
              private notifService: NotificationService) { }

  ngOnInit() {
    if (this.authService.account) {
      this.account = this.authService.account;
    } else {
      this.authService.getSelfAccount()
        .subscribe(
          resp => {
            this.account = resp;
          },
          err => {
            this.notifService.error('could not get user info', null, err);
          }
        );
    }
  }

}
