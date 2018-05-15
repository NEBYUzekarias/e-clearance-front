import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ClearanceService } from '../../../services/clearance.service';
import { Clearance } from '../../../models/clearance';
import {NotificationService} from "../../../services/notification.service";
import {appConfig} from "../../../app.config";

declare var Materialize: any;

@Component({
  selector: 'app-student-view-clearance-progress',
  templateUrl: './student-view-clearance-progress.component.html',
  styleUrls: ['./student-view-clearance-progress.component.css']
})
export class StudentViewClearanceProgressComponent implements OnInit {
  clearances: Clearance[];

  states = appConfig.states;
  pagination_url = `/clearances/count?where={"state":"${appConfig.states.PENDING}"}`;

  constructor(private clearanceService: ClearanceService,
              private notifService: NotificationService) {}

  ngOnInit() {
  }

  populateClearances() {
    this.clearanceService.getActiveClearances()
      .subscribe(
        resp => {
          this.clearances = resp;
          console.log('clearances: ', this.clearances);
        },
        err => {
          this.notifService.error("Error: while getting list of progresses", null, err);
        }

      );
  }

}
