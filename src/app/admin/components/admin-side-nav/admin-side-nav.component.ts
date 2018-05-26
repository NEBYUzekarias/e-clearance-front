import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.css']
})
export class AdminSideNavComponent implements OnInit {
  account: Account;

  constructor(private authService: AuthService) {
    this.account = this.authService.account;
  }

  ngOnInit() {
    $('.sidenav').sidenav();
  }

}
