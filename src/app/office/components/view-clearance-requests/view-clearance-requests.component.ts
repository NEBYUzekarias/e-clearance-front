import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import {Request} from '../../../models/request';
import {ClearanceService} from '../../../services/clearance.service';
import {NotificationService} from '../../../services/notification.service';
import {appConfig} from '../../../app.config';

declare var $: any;

@Component({
  selector: 'app-view-clearance-requests',
  templateUrl: './view-clearance-requests.component.html',
  styleUrls: ['./view-clearance-requests.component.css']
})
export class ViewClearanceRequestsComponent implements OnInit {

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

  isSearching = false;

  searchMessage = 'Searching...';

  loadMessage = 'Loading requests list...';

  constructor(private authService: AuthService,
              private clearanceService: ClearanceService,
              private notifService: NotificationService) {

    const base_filter = this.clearanceService.getPendingRequestsBaseFilter();

    this.pagination_url =
      `/requests/count?where=` + JSON.stringify(base_filter);
  }

  requests: Request[];
  pagination_url: string;

  ngOnInit() {
    this.populateClearances();
  }

  populateClearances(): void {
    this.clearanceService.getPendingRequests().subscribe(
      resp => {
        this.requests = resp;
      }
    );
  }

  approveRequest(request_id: string, request_index: number) {
    this.clearanceService.approveRequest(request_id)
      .subscribe(
        resp => {
          this.notifService.success('Request Approved', null);
          this.requests.splice(request_index, 1);
        }
      );
  }

  sendReview(request_id: string, request_index: number, reason: string) {
    this.clearanceService.sendReview(request_id, reason)
      .subscribe(
        resp => {
          this.notifService.success('Review sent', null);
        }
      );
  }

  //search for specific or group of clearance requests
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
