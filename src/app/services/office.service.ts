import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Office} from '../models/office';
import {HttpClient} from '@angular/common/http';
import {appConfig} from '../app.config';
import {DebtList} from '../models/debt-list';

@Injectable()
export class OfficeService {

  constructor(private httpClient: HttpClient) { }

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
    return this.httpClient.patch(appConfig.apiUrl + `/departments/${officeName}`, path);
  }

  updateDebtList(list): Observable<DebtList[]> {
    return this.httpClient.post(appConfig.apiUrl + `/debtlists`, list).
      map(
        resp => {
          return resp as DebtList[];
        }
    );
  }
  removeDebtList(list) {

  }
  getOfficeDebtList(officeName): Observable<DebtList[]> {
    return this.httpClient.get(appConfig.apiUrl + `/debtlists?filter={"where":{"office_name":"${officeName}"}}`)
      .map(
        resp => {
          return resp as DebtList[];
        }
      );
  }

  updateSingleDebtList(debtList: DebtList) {
      return this.httpClient.patch(appConfig.apiUrl + `/debtlists`, debtList);
  }

  deleteSingleDebtList(id: string) {
      return this.httpClient.delete(appConfig.apiUrl + `/debtlists/${id}`);
  }


}
