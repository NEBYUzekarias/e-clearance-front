import { Component, OnInit } from '@angular/core';
import {Clearance} from "../../../models/clearance";
import {ClearanceService} from "../../../services/clearance.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-student-clearance-history',
  templateUrl: './student-clearance-history.component.html',
  styleUrls: ['./student-clearance-history.component.css']
})
export class StudentClearanceHistoryComponent implements OnInit {
  clearances: Clearance[];

  constructor(private clearanceService: ClearanceService,
              private notifService: NotificationService) {
  }

  ngOnInit() {
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
