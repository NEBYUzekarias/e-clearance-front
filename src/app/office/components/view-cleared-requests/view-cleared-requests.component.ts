import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {ClearanceService} from "../../../services/clearance.service";
import {Request} from "../../../models/request";
import {appConfig} from "../../../app.config";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-view-cleared-requests',
  templateUrl: './view-cleared-requests.component.html',
  styleUrls: ['./view-cleared-requests.component.css']
})
export class ViewClearedRequestsComponent implements OnInit {

  searchOptions = [
    {
      optValue: 'studentId',
      optDisplay: 'By student id'
    },
    {
      optValue: 'departmentId',
      optDisplay: 'By department'
    }
  ];

  loadMessage = 'Loading list...';

  searchMessage = 'Searching...';

  isSearching = false;

  constructor(private authService: AuthService,
              private clearanceService: ClearanceService,
              private notifService: NotificationService) {
    // get where filter for loopback REST api
    const base_filter = this.clearanceService.getClearedRequestsBaseFilter();

    // create pagination url
    this.pagination_url =
      `/requests/count?where=` + JSON.stringify(base_filter);
  }

  requests: Request[];
  pagination_url: string;

  ngOnInit() {
    this.populateClearances();
  }

  populateClearances(): void {
    this.clearanceService.getClearedRequests().subscribe(
      resp => {
        this.requests = resp;
      },
      err => {
        this.notifService.error(null, null, err);
      }
    );
  }

  // do search
  doSearch(event) {
    if (event.hasTerm) {
      this.isSearching = true;
      console.log(event);

      //api call
    } else {
      this.isSearching = false;
      console.log(event);
    }
  }

}
