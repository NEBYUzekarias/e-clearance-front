import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Clearance} from '../models/clearance';
import {HttpClient} from '@angular/common/http';
import {appConfig} from '../app.config';
import {Request} from '../models/request';
import {Info} from '../models/Info';
import {PaginationService} from './pagination.service';
import {AuthService} from './auth.service';
import {Account} from "../models/account";

@Injectable()
export class ClearanceService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private paginationService: PaginationService) {
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
   *get the where loopback REST api filter object
   * that have to be changed to json to use it directly
   * in the REST api
   * @returns {Object}: loopback filter object
   */
  getActiveClearancesBaseFilter(): object {
    return {
      state: appConfig.states.PENDING,
      studentId: this.authService.account.id,
    };
  }

  /**
   * get active clearances of a student
   * @returns {Observable<Clearance[]>}: clearances
   */
  getActiveClearances(): Observable<Clearance[]> {
    // get loopback REST filter partial json string
    const page_filter = this.paginationService.get_page_filter();
    const base_filter = this.getActiveClearancesBaseFilter();
    const include_filter = {
      include: ['student', 'requests'],
    };

    const rest_filter = this.concat({where: base_filter}, page_filter, include_filter);

    return this.httpClient.get(
      appConfig.apiUrl +
      `/clearances?filter=` + JSON.stringify(rest_filter))
      .map(
        (resp: any) => {
          return resp as Clearance[];
        }
      );
  }

  /**
   *get the where loopback REST api filter object
   * that have to be changed to json to use it directly
   * in the REST api
   * @returns {Object}: loopback filter object
   */
  getClearanceHistoryBaseFilter(): object {
    return {
      state: appConfig.states.APPROVED,
      studentId: this.authService.account.id,
    };
  }

  /**
   * get clearance history of a student
   * @returns {Observable<Clearance[]>}: clearances
   */
  getClearanceHistory(): Observable<Clearance[]> {
    // get loopback REST filter partial json string
    const page_filter = this.paginationService.get_page_filter();
    const base_filter = this.getClearanceHistoryBaseFilter();
    const include_filter = {
      include: 'requests',
    };

    const rest_filter = this.concat({where: base_filter}, page_filter, include_filter);

    return this.httpClient.get(
      appConfig.apiUrl +
      `/clearances?filter=` + JSON.stringify(rest_filter))
      .map(resp => {
        return resp as Clearance[];
      });
  }

  /**
   * get the where loopback REST api filter object
   * that have to be changed to json to use it directly
   * in the REST api
   * @returns {Object}: loopback filter object
   */
  getPendingRequestsBaseFilter(): object {
    const departmentId = this.authService.account.department.name;

    const where_filter = {
      and: [
        {
          or: [
            {state: appConfig.states.PENDING},
            {state: appConfig.states.NEED_REVIEW},
          ]
        },
        {
          departmentId: departmentId,
        },
      ]
    };

    return where_filter;
  }

  /**
   * get pending clearance requests sent to an office
   * @returns {Observable<Request[]>}
   */
  getPendingRequests(): Observable<Request[]> {
    // get loopback REST filter partial json string
    const page_filter = this.paginationService.get_page_filter();
    const base_filter = this.getPendingRequestsBaseFilter();
    const include_filter = {
      include: {
        clearance: ['student', 'requests'],
      },
    };

    // concatenate all filter objects
    const rest_filter = this.concat({where: base_filter}, page_filter, include_filter);

    return this.httpClient.get(
      appConfig.apiUrl +
      `/requests?filter=` + JSON.stringify(rest_filter))
      .map(resp => {
        let requests = resp as object[];

        const length = requests.length;
        for (let i = 0; i < length; i++) {
          let preconditions = {
            departmentIds: [],
            states: [],
          };

          // assume the request can be approved
          requests[i]['can_approve'] = true;
          const clearance = requests[i]['clearance'];
          // set up department departmentIds requested to approve
          const pre_departments = this.parsePreconditions(
            this.authService.account.department.preconditions, clearance.student
          );

          const inner_length = clearance.requests.length;
          for (let j = 0; j < inner_length; j++) {
            // include it if the current request department is in required departments
            let index = pre_departments.indexOf(clearance.requests[j].departmentId);
            if (index > -1) {
              preconditions.departmentIds.push(clearance.requests[j].departmentId);
              preconditions.states.push(clearance.requests[j].state);

              // preconditions[clearance.requests[j].departmentId] = clearance.requests[j].state;

              if (clearance.requests[j].state !== appConfig.states.APPROVED) {
                // set that the request can not be approved
                requests[i]['can_approve'] = false;
              }
            }
          }

          // set the convenient data structured preconditions on request
          requests[i]['preconditions'] = preconditions;
        }

        return requests as Request[];
      });
  }

  /**
   * get the where loopback REST api filter object
   * that have to be changed to json to use it directly
   * in the REST api
   * @returns {Object}: loopback filter object
   */
  getClearedRequestsBaseFilter(): object {
    // get the department of the office user to filter requests
    const departmentId = this.authService.account.department.name;

    // create where filter object
    const where_filter = {
      and: [
        {state: appConfig.states.APPROVED},
        {departmentId: departmentId},
      ]
    };

    return where_filter;
  }

  /**
   * get successfuly cleared clearance requests of an office
   * @returns {Observable<Request[]>}
   */
  getClearedRequests(): Observable<Request[]> {
    // get loopback REST filter objects
    const page_filter = this.paginationService.get_page_filter();
    const base_filter = this.getClearedRequestsBaseFilter();
    const include_filter = {
      include: {
        clearance: 'student',
      },
    };

    // concatenate all filter objects
    const rest_filter = this.concat({where: base_filter}, page_filter, include_filter);

    return this.httpClient.get(
      appConfig.apiUrl +
      `/requests?filter=` + JSON.stringify(rest_filter))
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
      appConfig.apiUrl + `/requests/${request_id}`, {state: appConfig.states.APPROVED})
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
      {state: appConfig.states.NEED_REVIEW, reason: reason}
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

  setCurrentInfos(info: Info): any {
    return this.httpClient.patch(appConfig.apiUrl + '/infos', info);
  }

  /**
   * concatenate given objects
   * @param {Object} objects
   * @returns {Object}
   */
  concat(...objects: object[]): object {
    const new_object = {};

    const length = objects.length;
    for (let i = 0; i < length; i++) {
      for (const prop in objects[i]) {
        new_object[prop] = objects[i][prop];
      }
    }

    return new_object;
  }

  /**
   * parse preconditions to a list of department departmentIds
   * @param {Object[]} preconditions: an array of preconditions from database
   * @param student: a student account to set specific department in preconditions
   * @returns {Array}
   */
  parsePreconditions(preconditions: object[], student: Account) {
    let requested_departments = [];

    const length = preconditions.length;
    for (let i = 0; i < length; i++) {
      if (preconditions[i]['conditionId'] === '$student_department') {
        requested_departments.push(student.departmentId);
      } else {
        requested_departments.push(preconditions[i]['conditionId']);
      }
    }

    return requested_departments;
  }
}
