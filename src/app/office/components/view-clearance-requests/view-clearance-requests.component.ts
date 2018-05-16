import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import {Request} from "../../../models/request";
import {ClearanceService} from "../../../services/clearance.service";
import {NotificationService} from "../../../services/notification.service";
import {appConfig} from "../../../app.config";

declare var $: any;

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

  states = appConfig.states;  // states constants for template
  requests: Request[];
  pagination_url: string;

  ngOnInit() {
    this.populateClearances();
  }

  /**
   * initialize materialize modals
   */
  init_modals(): void {
    $(document).ready(function() {
      $('.modal').modal();
    });
  }

  /**
   * populate clearances, actually in this case populates
   * requests of an office
   */
  populateClearances(): void {
    this.clearanceService.getPendingRequests().subscribe(
      resp => {
        this.requests = resp;
        console.log('resp', resp);

        this.init_modals();
      },
      err => {
        this.notifService.error(null, null, err);
      }
    );
  }

  /**
   * approves request
   * @param {string} request_id
   * @param {number} request_index: index of request in this.requests array
   */
  approveRequest(request_id: string, request_index: number) {
    this.clearanceService.approveRequest(request_id)
      .subscribe(
        resp => {
          this.notifService.success('Request Approved', null);
          this.requests.splice(request_index, 1);
        }
      );
  }

  /**
   * sends review for request
   * @param form: review form( a kind of )
   * @param {number} request_index: index of request in this.requests array
   */
  sendReview(form: any, request_index: number) {
    const request_id = this.requests[request_index].id;

    const reason = form.value.reason.trim();
    if (reason) {
      this.clearanceService.sendReview(request_id, reason)
        .subscribe(
          resp => {
            this.requests[request_index].state = appConfig.states.NEED_REVIEW;
            this.notifService.success('Review sent successfully', null);
          },
          err => {
            this.notifService.error('Sending review failed', null, err);
          }
        );
    }
  }
}
