import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {appConfig} from "../app.config";

@Injectable()
export class SourceService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService) { }

  getSource(): Observable<any> {
    let where_filter = {
      where: {
        departmentId: this.authService.account.departmentId
      }
    };
    console.log('where for source', where_filter);
    return this.httpClient.get(
      appConfig.apiUrl + '/DbConfigs?filter=' + JSON.stringify(where_filter)
    );
  }

  createSource(source): Observable<any> {
    source.departmentId = this.authService.account.departmentId;

    return this.httpClient.post(
      appConfig.apiUrl + '/DbConfigs', source
    );
  }

  /**
   * update source model in backend
   * @param source: source to be updated
   * @returns {Observable<any>}
   */
  updateSource(source): Observable<any> {
    let where_filter = {departmentId: this.authService.account.departmentId};

    return this.httpClient.post(
      appConfig.apiUrl + '/DbConfigs/update?where=' + JSON.stringify(where_filter),
      source,
    );
  }

  testSource(source): Observable<any> {
    let filter = {
      source: source,
    };

    return this.httpClient.get(
      appConfig.apiUrl + '/DbConfigs/conntest?filter=' + JSON.stringify(filter)
    );
  }

  removeSource(source): Observable<any> {
    return this.httpClient.delete(appConfig.apiUrl + `/DbConfigs/${source.id}`);
  }
}
