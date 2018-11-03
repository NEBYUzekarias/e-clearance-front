import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import { Account } from '../../../models/account';

declare var $: any;

@Component({
  selector: 'app-office-side-nav',
  templateUrl: './office-side-nav.component.html',
  styleUrls: ['./office-side-nav.component.css']
})
export class OfficeSideNavComponent implements OnInit {

  account: Account;

  constructor(public authService: AuthService) {
    this.account = this.authService.account;
  }

  ngOnInit() {
    $('.sidenav').sidenav();
  }

}
