import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Office} from '../../../models/office';
import {OfficeService} from '../../../services/office.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  departments: Office[];

  studentAccount: Account;

  onLoadMessage = 'Loading list of departments...';

  constructor(private authService: AuthService,
              private officeService: OfficeService) {
  }

  ngOnInit() {
    this.officeService.getOffices()
      .subscribe(
        resp => {
          this.departments = resp;
          console.log(resp);

          this.studentAccount = this.authService.account;
        }
      );
  }

}
