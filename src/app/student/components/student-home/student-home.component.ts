import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {ApiService} from '../../../services/api.service';
import {AuthService} from '../../../services/auth.service';
import {Office} from '../../../models/office';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  departments: Office[];

  studentAccount: Account;

  onLoadMessage = 'Loading list of departments...'

  constructor(
    private accountService: AccountService,
    private  apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.apiService.getListOfDepartments()
      .subscribe(
        resp =>{
          this.departments = resp;
          console.log(resp);
          this.authService.getSelfAccount()
            .subscribe(
              resp =>{
                this.studentAccount = resp;
              }
            );
        }
      );
  }

}
