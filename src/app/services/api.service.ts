import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {appConfig} from '../app.config';
import {Office} from '../models/office';

@Injectable()
export class ApiService {

  constructor(private authService: AuthService,
              private httpClient: HttpClient) {

  }

  getListOfDepartments(): Observable<Office[]>{
    return this.httpClient.get(`${appConfig.apiUrl}/departments?filter[where][student_department]=false`)
      .map(
        resp => {
          return resp as Office[];
        }
      );
  }

}
