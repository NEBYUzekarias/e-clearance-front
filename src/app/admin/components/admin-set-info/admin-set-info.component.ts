import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Info} from '../../../models/Info';
import {Clearance} from '../../../models/clearance';
import {ClearanceService} from '../../../services/clearance.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-admin-set-info',
  templateUrl: './admin-set-info.component.html',
  styleUrls: ['./admin-set-info.component.css']
})
export class AdminSetInfoComponent implements OnInit {
  YEAR_PATTERN = /^20\d{2}\/\d{2}$/;
  SEMESTER_PATTERN = /^I{1,3}$/;

  infos: any = {academic_year: 'Fetching...', semester: 'Fetching...'};
  form: FormGroup;

  constructor(private clearanceService: ClearanceService,
              private notifService: NotificationService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      academic_year: new FormControl('', [
        Validators.required,
        Validators.pattern(this.YEAR_PATTERN)
      ]),
      semester: new FormControl('', [
        Validators.required,
        Validators.pattern(this.SEMESTER_PATTERN)
      ])
    });

    this.clearanceService.getCurrentInfos()
      .subscribe(
        resp => {
          this.infos = resp;

          for (const prop in this.infos) {
            this.form.controls[prop].setValue(this.infos[prop]);
          }
        }
      );
  }

  doUpdateInfos() {
    // set up changed form value in cleanFormValues
    // and set up if any of the infos Changed
    const cleanFormValues = {};
    let infosChanged = false;
    for (const prop in this.form.value) {
      if (this.form.value[prop] !== this.infos[prop]) {
        cleanFormValues[prop] = new Info(prop, this.form.value[prop]);
        infosChanged = true;
      }
    }

    if (infosChanged) {
      // N.B. very HIGHLY dependent on the backend structure,setup and variables
      // update each info step by step
      for (const prop in cleanFormValues) {
        this.clearanceService.setCurrentInfo(cleanFormValues[prop])
          .subscribe(
            resp => {
              this.infos[prop] = cleanFormValues[prop].value;

              this.notifService.success(prop + ' successfully updated', null);
            },
            err => {
              this.notifService.error(
                'Something went wrong when updating ' + prop, null, err);
            }
          );
      }
    } else {
      this.notifService.info('You have not changed any value.', null);
    }
  }

}
