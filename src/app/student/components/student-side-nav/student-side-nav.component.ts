import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Account} from '../../../models/account';
declare var $: any;
@Component({
  selector: 'app-student-side-nav',
  templateUrl: './student-side-nav.component.html',
  styleUrls: ['./student-side-nav.component.css']
})
export class StudentSideNavComponent implements OnInit {
  userAccount: Account = new Account();
  constructor(private authService: AuthService) { }

  ngOnInit() {
    $('.sidenav').sidenav();
    this.authService.getSelfAccount()
      .subscribe(
        resp =>{
          this.userAccount = resp;
        }
      );
  }

}
