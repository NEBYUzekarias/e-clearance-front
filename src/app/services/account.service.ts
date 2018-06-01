import { Injectable } from '@angular/core';
import {Account} from '../models/account';
import {Observable} from 'rxjs/Observable';
import {appConfig} from '../app.config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AccountService {

  constructor(private httpClient: HttpClient) { }
  
  /**
   * change password of an account
   * @param {Object} changeInformation: old and new password with necessary change info
   * @returns {Observable<any>}
   */
  changePassword(changeInformation: object): Observable<any> {
    return this.httpClient.post(
      appConfig.apiUrl + '/accounts/change-password', changeInformation);
  }

  /**
   * add new user account in the backend
   * @param {Account} account: account to be added
   * @returns {Observable<Account>}: added account
   */
  addUserAccount(account: Account): Observable<Account> {
    return this.httpClient.post(appConfig.apiUrl + '/accounts', account)
      .map(resp => resp as Account);
  }

  /**
   * generate password for an account
   * @param {Account} account: account for which password will be created
   * @returns {string}: generated password
   */
  generatePassword(account: Account): string {
    return 'jkl;';
  }

  /**
   * find user account for an office user or student
   * @param username: student id or office username
   * @returns {Observable<Account>}
   */
  findUserAccount(username): Observable<Account[]> {
    return this.httpClient
      .get(appConfig.apiUrl + `/accounts?filter={"where":{"username":"${username}"}}`)
      .map(
        resp => {
          return resp as Account[];
        }
      );
  }

  /**
   * update the password on an account
   * @param {Account} account
   * @param {string} newPassword
   * @returns {Observable<any>}
   */
  updatePassword(account: Account, newPassword: string): Observable<any> {
    // create appropriate request body
    let body = {
      accountId: account.id,
      password: newPassword,
    };

    return this.httpClient
      .put(appConfig.apiUrl + `/accounts/update_password`, body);
  }

}
