import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Account} from '../../../models/account';

declare var $: any;

@Component({
  selector: 'app-student-side-nav',
  templateUrl: './student-side-nav.component.html',
  styleUrls: ['./student-side-nav.component.css']
})
export class StudentSideNavComponent implements OnInit {
  account: Account = new Account();

  constructor(private authService: AuthService) {
    this.account = this.authService.account;
  }

  ngOnInit() {
    $('.sidenav').sidenav();
  }

}
