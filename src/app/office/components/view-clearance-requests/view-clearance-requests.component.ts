import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import {Request} from "../../../models/request";
import {ClearanceService} from "../../../services/clearance.service";
import {appConfig} from "../../../app.config";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-view-clearance-requests',
  templateUrl: './view-clearance-requests.component.html',
  styleUrls: ['./view-clearance-requests.component.css']
})
export class ViewClearanceRequestsComponent implements OnInit {

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
}
