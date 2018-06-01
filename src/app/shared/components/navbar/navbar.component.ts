import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Account} from '../../../models/account';
import { appConfig } from '../../../app.config';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() account: Account;
  home_url = '/';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.account) {
      if (this.account.user_role === appConfig.roles.STUDENT) {
        this.home_url = '/student/home';
      } else if (this.account.user_role === appConfig.roles.OFFICE) {
        this.home_url = '/office/pending_requests';
      } else if (this.account.user_role === appConfig.roles.ADMIN) {
        this.home_url = '/admin/register_office_user';
      }
    }
  }
}
