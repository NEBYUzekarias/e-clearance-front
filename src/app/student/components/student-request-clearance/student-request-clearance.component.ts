import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Office} from '../../../models/office';
import {OfficeService} from '../../../services/office.service';
import {ClearanceService} from '../../../services/clearance.service';
import {NotificationService} from '../../../services/notification.service';


@Component({
  selector: 'app-student-request-clearance',
  templateUrl: './student-request-clearance.component.html',
  styleUrls: ['./student-request-clearance.component.css']
})
export class StudentRequestClearanceComponent implements OnInit {

  offices: Office[];
  infos: object = {academic_year: '', semester: ''};

  reasonForClearance = 'Class end'; // default selected reason
  otherReasonRequired = false;

  form = new FormGroup({
    reason: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService,
              private officeService: OfficeService,
              private clearanceService: ClearanceService,
              private notifService: NotificationService) {
  }

  ngOnInit() {
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

    // set current infos like academic year and semester
    this.clearanceService.getCurrentInfos().subscribe(
      resp => {
        this.infos = resp;
        console.log('fetched infos:', this.infos);
      }, err => {
        this.notifService.error('Could not fetch year and semester information', null, err);
      }
    );
  }

  processSubmit() {
    if (this.otherReasonRequired) {
      this.reasonForClearance = this.form.value.reason;
    }

    // console.log('reason to be sent', this.reasonForClearance);
    this.clearanceService.submitClearanceRequest(this.reasonForClearance)
      .subscribe(
        resp => {
          this.notifService.success('Clearance submitted successfully', null);
        },
        err => {
          this.notifService.error(null, null, err);
        }
      );
  }

  otherReasonSelected() {
    this.otherReasonRequired = true;

  }

  otherReasonNotSelected(event) {
    this.reasonForClearance = event.target.value;
    this.otherReasonRequired = false;
  }

}
