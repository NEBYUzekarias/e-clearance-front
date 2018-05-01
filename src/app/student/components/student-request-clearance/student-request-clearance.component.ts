import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import {Office} from "../../../models/office";
import {OfficeService} from "../../../services/office.service";
import {ClearanceService} from "../../../services/clearance.service";
import {NotificationService} from "../../../services/notification.service";
declare var $: any;
declare var Materialize: any;
@Component({
  selector: 'app-student-request-clearance',
  templateUrl: './student-request-clearance.component.html',
  styleUrls: ['./student-request-clearance.component.css']
})
export class StudentRequestClearanceComponent implements OnInit {

  offices: Office[];

  constructor(private authService: AuthService,
              private officeService: OfficeService,
              private clearanceService: ClearanceService,
              private notifService: NotificationService) {
  }

  ngOnInit() {
    $('select').material_select();

    // set offices
    this.officeService.getOffices().subscribe(
      resp => {
        this.offices = resp;

        // include department of student in offices
        this.offices.push(this.authService.account.department);
      }, err => {
        this.notifService.error('couldnt fetch offices', null, err);
      }
    );
  }

  processSubmit(form_data) {
    console.log('form data;', form_data);
    this.clearanceService.submitClearanceRequest(form_data.value.reason)
      .subscribe(
        resp => {
          Materialize.toast('Clearance submitted successfully', 5000);
        }
      );
  }

}
