import { Injectable } from '@angular/core';
import {Account} from "../models/account";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {appConfig} from "../app.config";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  changePassword(changeInformation: object): Observable<any> {
    return this.httpClient.post(
      appConfig.apiUrl + '/accounts/change-password', changeInformation);
  }

  addUserAccount(account: Account): Observable<any> {
    return this.httpClient.post(appConfig.apiUrl + '/accounts', account);
  }

}
