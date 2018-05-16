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
  onLoadMessage = 'Loading clearance history...'
  pagination_url: string;

  constructor(private clearanceService: ClearanceService,
              private notifService: NotificationService) {

    const base_filter = this.clearanceService.getClearanceHistoryBaseFilter();

    this.pagination_url =
      `/clearances/count?where=` + JSON.stringify(base_filter);
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
