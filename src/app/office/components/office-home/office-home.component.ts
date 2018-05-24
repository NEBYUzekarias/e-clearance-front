import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Account} from '../../../models/account';

@Component({
  selector: 'app-office-home',
  templateUrl: './office-home.component.html',
  styleUrls: ['./office-home.component.css']
})
export class OfficeHomeComponent implements OnInit {

  account: Account = new Account();
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.getSelfAccount()
      .subscribe(
        resp =>{
          this.account = resp;
        }
      );
  }

}
