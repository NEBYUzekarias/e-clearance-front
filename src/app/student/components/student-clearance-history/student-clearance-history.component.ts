import { Component, OnInit } from '@angular/core';
import {Clearance} from "../../../models/clearance";
import {ClearanceService} from "../../../services/clearance.service";
import {NotificationService} from "../../../services/notification.service";
import {appConfig} from "../../../app.config";

@Component({
  selector: 'app-student-clearance-history',
  templateUrl: './student-clearance-history.component.html',
  styleUrls: ['./student-clearance-history.component.css']
})
export class StudentClearanceHistoryComponent implements OnInit {
  clearances: Clearance[];

  pagination_url = `/clearances/count?where={"state":"${appConfig.states.APPROVED}"}`;

  constructor(private clearanceService: ClearanceService,
              private notifService: NotificationService) {
  }

  ngOnInit() {
  }

  populateClearances() {
    this.clearanceService.getClearanceHistory()
      .subscribe(
        resp => {
          this.clearances = resp;
        },
        err => {
          this.notifService.error('error getting clearance history', null, err);
        }
      );
  }

}
