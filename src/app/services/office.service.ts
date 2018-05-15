import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Office} from "../models/office";
import {HttpClient} from "@angular/common/http";
import {appConfig} from "../app.config";

@Injectable()
export class OfficeService {

  constructor(private httpClient: HttpClient) { }

  getOffices(): Observable<Office[]> {
    return this.httpClient.get(
      appConfig.apiUrl + '/departments?filter={"where": {"student_department": false}}'
    ).map(resp => {
      return resp as Office[];
    });
  }
}
