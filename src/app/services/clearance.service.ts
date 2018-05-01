import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Clearance} from "../models/clearance";

@Injectable()
export class ClearanceService {

  constructor() { }

  /**
   * submit a clearance request on behalf of student
   * clearance request maybe brand new or to retry a sending same clearance
   * to some of offices where clearance had not arrived somehow
   * @param {string} reason: reason for clearance
   * @returns {Observable<string[]>}: office ids or names where successful clearance sent
   */
  submitClearanceRequest(reason: string): Observable<string[]> {

    return Observable.of(['sport', 'libraray']);
  }

  /**
   * get active clearance requests of a student
   * @returns {Observable<Clearance[][]>}: clearances grouped in common case
   */
  getActiveClearances(): Observable<Clearance[][]> {

    return null;
  }

  /**
   * get clearance request history of a student
   * @returns {Observable<Clearance[][]>}: clearances grouped in common case
   */
  getClearanceHistory(): Observable<Clearance[][]> {

    return null;
  }

  /**
   * get pending clearance requests sent to an office
   * @returns {Observable<Clearance[]>}
   */
  getPendingClearances(): Observable<Clearance[]> {

    return null;
  }

  /**
   * get successfuly cleared clearances of an office
   * @returns {Observable<Clearance[]>}
   */
  getClearedClearances(): Observable<Clearance[]> {

    return null;
  }

  /**
   * approve a clearance as an office
   * @param {string} clearance_id
   * @returns {Observable<boolean>}: if approving succeed or not
   */
  approveClearance(clearance_id: string): Observable<boolean> {

    return null;
  }

  /**
   * inform that a clearance need review as an office
   * @param {string} clearance_id
   * @param {string} reason: why clearance failed and need review
   * @returns {Observable<boolean>}: if clearance state change succeed or not
   */
  sendReview(clearance_id: string, reason: string): Observable<boolean> {

    return null;
  }
}
