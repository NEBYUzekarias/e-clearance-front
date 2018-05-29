import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Office} from "../models/office";
import {HttpClient} from "@angular/common/http";
import {appConfig} from "../app.config";

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
}
