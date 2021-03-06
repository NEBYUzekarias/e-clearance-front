import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {Account} from '../../models/account';
import { appConfig } from '../../app.config';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // waiting for api response
  waiting = false;

  waitingMessage = 'Authenticating...';
  // url to be redirected when login successful
  nextUrl: string;

  // login form
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthService,
              private notifService: NotificationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    $('.parallax').parallax();
    // get next url from route parameters or use default url
    this.nextUrl = this.route.snapshot.queryParams['nextUrl'];
  }

  /**
   * login user
   */
  login() {
    this.waiting = true;

    console.log(this.form.value);
    this.authService.login(this.form.value)
      .subscribe(
        resp => {
          this.waiting = false;

          if (this.nextUrl) {
            this.router.navigate([this.nextUrl]);
          } else {
            if (this.authService.account) {
              console.log('auth account:', this.authService.account);
              // use if account is found on local storage
              this.redirectToHome(this.authService.account);
            } else {
              // fetch account info from api
              this.authService.getSelfAccount()
                .subscribe(
                  account => {
                    this.redirectToHome(account);
                  },
                  err => {
                    this.notifService.error('could not fetch account info', null, err);
                  }
                );
            }
          }
        },
        err => {
          this.waiting = false;

          this.notifService.error('Username or password incorrect', null, err);
        }
      );
  }

  redirectToHome(account: Account): void {
    if (account.user_role === appConfig.roles.STUDENT) {
      this.router.navigate(['/student/home']);
    } else if (account.user_role === appConfig.roles.OFFICE) {
      this.router.navigate(['/office/pending_requests']);
    } else if (account.user_role === appConfig.roles.ADMIN) {
      this.router.navigate(['/admin/register_office_user']);
    }
  }
}
