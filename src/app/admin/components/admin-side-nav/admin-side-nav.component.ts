import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import { Account } from '../../../models/account';

declare var $: any;

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.css']
})
export class AdminSideNavComponent implements OnInit {
  account: Account;

  constructor(public authService: AuthService) {
    this.account = this.authService.account;
  }

  ngOnInit() {
    $('.sidenav').sidenav();
  }

}
