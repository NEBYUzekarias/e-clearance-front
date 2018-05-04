import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Clearance} from "../models/clearance";
import {HttpClient} from "@angular/common/http";
import {appConfig} from "../app.config";
import {Request} from "../models/request";
import {Info} from "../models/Info";

@Injectable()
export class ClearanceService {

  states = appConfig.states;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * submit a clearance request on behalf of student
   * @param {string} reason: reason for clearance
   * @returns {Observable<Clearance>}: created clearance
   */
  submitClearanceRequest(reason: string): Observable<Clearance> {
    return this.httpClient.post(appConfig.apiUrl + '/clearances', {reason: reason})
      .map(resp => {
        return resp as Clearance;
      });
  }

  /**
   * get active clearances of a student
   * @returns {Observable<Clearance[]>}: clearances
   */
  getActiveClearances(): Observable<Clearance[]> {
    return this.httpClient.get(
      appConfig.apiUrl +
      `/clearances?filter=` +
      `{"where": {"state":"${this.states.PENDING}"},"include": ["student", "requests"]}`)
      .map(
        (resp: any) => {
          return resp as Clearance[];
        }
      );
  }

  /**
   * get clearance history of a student
   * @returns {Observable<Clearance[]>}: clearances
   */
  getClearanceHistory(): Observable<Clearance[]> {
    return this.httpClient.get(
      appConfig.apiUrl +
      `/clearances?filter=` +
      `{"where": {"state":"${this.states.APPROVED}"},"include": "requests"}`)
      .map(resp => {
        return resp as Clearance[];
      });
  }

  /**
   * get pending clearance requests sent to an office
   * @returns {Observable<Request[]>}
   */
  getPendingRequests(): Observable<Request[]> {
    return this.httpClient.get(
      appConfig.apiUrl +
      `/requests?filter=` +
      `{"where": {"or": [{"state":"${this.states.PENDING}"},{"state":"${this.states.NEED_REVIEW}"}]},` +
      `"include": {"clearance": "student"}}`)
      .map(resp => {
        return resp as Request[];
      });
  }

  /**
   * get successfuly cleared clearance requests of an office
   * @returns {Observable<Request[]>}
   */
  getClearedRequests(): Observable<Request[]> {
    return this.httpClient.get(
      appConfig.apiUrl +
      `/requests?filter=` +
      `{"where": {"state":"${this.states.APPROVED}"}, "include": {"clearance": "student"}}`)
      .map(resp => {
        return resp as Request[];
      });
  }

  /**
   * approve a clearance as an office
   * @param {string} request_id
   * @returns {Observable<Request>}: patched request
   */
  approveRequest(request_id: string): Observable<Request> {
    return this.httpClient.patch(
      appConfig.apiUrl + `/requests/${request_id}`, {state: this.states.APPROVED})
      .map(resp => {
        return resp as Request;
      });
  }

  /**
   * inform that a clearance need review as an office
   * @param {string} request_id: id of the request
   * @param {string} reason: why clearance failed and need review
   * @returns {Observable<request>}: patched request
   */
  sendReview(request_id: string, reason: string): Observable<Request> {
    return this.httpClient.patch(
      appConfig.apiUrl + `/requests/${request_id}`,
      {state: this.states.NEED_REVIEW, reason: reason}
    ).map(resp => {
      return resp as Request;
    });
  }

  /**
   * get current infos like current academic year and semester
   * @returns {Observable<object>}: current infos as key value pair
   */
  getCurrentInfos(): Observable<object> {
    return this.httpClient.get(appConfig.apiUrl + '/infos')
      .map(resp => {
        // create infos object as key value pair
        const infos = resp as Info[];
        const infos_object = {};
        const infos_num = infos.length;
        for (let i = 0; i < infos_num; i++) {
          infos_object[infos[i].name] = infos[i].value;
        }

        return infos_object;
      });
  }
}
