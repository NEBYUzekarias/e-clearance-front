import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-office-side-nav',
  templateUrl: './office-side-nav.component.html',
  styleUrls: ['./office-side-nav.component.css']
})
export class OfficeSideNavComponent implements OnInit {

  account: Account;

  constructor(private authService: AuthService) {
    this.account = this.authService.account;
  }

  ngOnInit() {
    $('.sidenav').sidenav();
  }

}
