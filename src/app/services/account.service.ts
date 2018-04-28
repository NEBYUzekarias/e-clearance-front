import { Injectable } from '@angular/core';
import {Account} from "../models/account";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";

@Injectable()
export class AccountService {

  constructor() { }

  getSelfAccount(): Observable<Account> {
    let account = new Account();
    account.username = "atr/0593/07";
    account.first_name = "yared";
    account.last_name = "tadde";
    account.user_role = 'student';

    return Observable.of(account);
  }

}
