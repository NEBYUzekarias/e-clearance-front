import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Office} from "../models/office";
import {HttpClient} from "@angular/common/http";
import {appConfig} from "../app.config";
import {DebtList} from '../models/debt-list';
import {AuthService} from "./auth.service";

@Injectable()
export class OfficeService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService) { }

  /**
   * get offices from backend which are not student department
   * @returns {Observable<Office[]>}: offices which are not student department
   */
  getOffices(): Observable<Office[]> {
    return this.httpClient.get(
      appConfig.apiUrl + '/departments?filter={"where": {"student_department": false}}'
    ).map(resp => {
      return resp as Office[];
    });
  }

  /**
   * get student departments
   * @returns {Observable<Office[]>}: student departments
   */
  getDepartments(): Observable<Office[]> {
    return this.httpClient.get(
      appConfig.apiUrl + '/departments?filter={"where": {"student_department": true}}'
    ).map(resp => {
      return resp as Office[];
    });
  }

  /**
   * get all offices including student departments and other offfices
   * @returns {Observable<Office[]>}: all offices
   */
  getAllOffices(): Observable<Office[]> {
    return this.httpClient.get(
      appConfig.apiUrl + '/departments'
    ).map(resp => {
      return resp as Office[];
    });
  }

  setDebtListFilePath(officeName, path) {
    return this.httpClient.patch(
      appConfig.apiUrl + `/departments/${officeName}`, path
    );
  }

  /**
   * Update debt list of a department
   * @param list: new debt list to be saved
   * @returns {Observable<DebtList[]>}: updated debt_list
   */
  updateDebtList(list): Observable<DebtList[]> {
    return this.httpClient.post(appConfig.apiUrl + `/debtlists`, list)
      .map(
        resp => {
          // update that the department debt_list is true now
          this.httpClient.patch(
            appConfig.apiUrl + `departments/${this.authService.account.department.name}`, {debt_list: true})
            .subscribe(
              inner_resp => {
                this.authService.account.department.debt_list = true;
                console.log('Account debt_list update successful');
              },
              err => {
                console.log('Account debt_list update failed');
              }
            );

          return resp as DebtList[];
        }
    );
  }

  getOfficeDebtList(): Observable<DebtList[]> {
    const officeName = this.authService.account.department.name;

    return this.httpClient.get(
      appConfig.apiUrl + `/debtlists?filter={"where":{"office_name":"${officeName}"}}`)
      .map(
        resp => {
          return resp as DebtList[];
        }
      );
  }


}
