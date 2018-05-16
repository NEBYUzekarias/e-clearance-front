import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
declare var $: any;
@Component({
  selector: 'app-office-side-nav',
  templateUrl: './office-side-nav.component.html',
  styleUrls: ['./office-side-nav.component.css']
})
export class OfficeSideNavComponent implements OnInit {

  userAccount: Account;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    $('.sidenav').sidenav();
    this.authService.getSelfAccount()
      .subscribe(resp => {
        this.userAccount = resp;
      });
  }

}
