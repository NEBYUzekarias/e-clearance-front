import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Account} from "../models/account";
import {Observable} from "rxjs/Observable";
import {appConfig} from "../app.config";
import "rxjs/add/operator/map";
import {NotificationService} from "./notification.service";
import {AccountService} from "./account.service";

@Injectable()
export class AuthService {

  private _access_token: string = null;
  get access_token(): string {
    if (this._access_token) {
      return this._access_token;
    } else {
      const local_token: string = localStorage.getItem(appConfig.local_keys.token);
      if (local_token) {
        this._access_token = local_token;
        return this._access_token;
      } else {
        return null;
      }
    }
  }
  set access_token(new_token: string) {
    // store user details and jwt access token in local storage to keep user logged in
    localStorage.setItem(appConfig.local_keys.token, new_token);

    this.getSelfAccount()
      .subscribe(
        null,
        err => {
          this.notifService.error('could not get account info', null, err);
        }
      );

    this._access_token = new_token;
  }

  private _account: Account = null;
  get account(): Account {
    if (this._account) {
      return this._account;
    } else {
      const local_account: Account
        = JSON.parse(localStorage.getItem(appConfig.local_keys.account));
      if (local_account) {
        this._account = local_account;
        return this._account;
      }

      return null;
    }
  }

  constructor(private http: HttpClient,
              private router: Router,
              private notifService: NotificationService,
              private accountService: AccountService) {  }

  login(account: Account): Observable<any> {
    return this.http
      .post(appConfig.apiUrl + '/users/login', account)
      .map((resp) => {
        // login successful if there's a jwt access token in the response
        if (resp && resp['id']) {  // res['id'] is awkwardly the access token
          this.access_token = resp['id'];
        }

        return resp;
      });
  }

  logout(): void {
    const access_token: string = localStorage.getItem(appConfig.local_keys.token);

    // if there is access token, logout from the server
    if (access_token) {
      this.http.post(appConfig.apiUrl + '/users/logout', null)
        .subscribe(
          resp => {
            // remove everything from local storage including access token
            localStorage.clear();

            this.router.navigate(['/login']);
          },
          err => {
            this.notifService.error(err, null);
          }
        );
    } else {
      // if no access token is found, can't logout from server
      // just do what you can on the client

      // remove everything from local storage including access token
      localStorage.clear();

      this.router.navigate(['/login']);
    }
  }

  getSelfAccount(): Observable<Account> {
    let account = new Account();
    account.username = "atr/0593/07";
    account.first_name = "yared";
    account.last_name = "tadde";
    account.user_role = "student";

    return Observable
      .of(account)
      .map((resp) => {
        // store account on local storage
        localStorage.setItem(appConfig.local_keys.account, JSON.stringify(resp));
        this._account = resp as Account;

        return resp;
      });
  }

  userName() {
    return 'yared';
  }
  getUserId(){
    return '1';
  }
  getUserAccessToken(){
    return '1';
  }

  userType(userType: string): boolean{
    return true;
  }

  isLoggedIn() {
    return true;
  }
  getOfficeType(userId){

  }



}
