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

  // values must be backend model properties
  searchOptions = [
    {
      optValue: 'username',
      optDisplay: 'By student id'
    },
    {
      optValue: 'departmentId',
      optDisplay: 'By department'
    }
  ];

  searching = {
    state: false,
    message: 'Searching...',
  };

  loading = {
    state: false,
    message: 'Loading...',
  };

  constructor(private authService: AuthService,
              private clearanceService: ClearanceService,
              private notifService: NotificationService) {
  }

  // search filter object that can be used
  // in creating of loopback API filter json
  search_filter: object = null;

  // pagination url that will be transferred to
  // a pagination component that inturn calls emits
  // reloading this component
  pagination_url: string;

  states = appConfig.states;  // states constants for template
  requests: Request[];

  ngOnInit() {
    this.invokePagination();  // populates clearances or requests
  }

  /**
   * initialize materialize modals component
   * should be called whenever modal items are repopulated
   */
  init_modals(): void {
    $(document).ready(function() {
      $('.modal').modal();
    });
  }

  invokePagination(): void {
    const base_filter = this.clearanceService.getPendingRequestsBaseFilter();

    if (this.search_filter) {
      const rest_filter = {
        where: base_filter,
        search: this.search_filter['search'],
      };
      this.pagination_url = this.clearanceService.requests_search_rest_url +
        '/count?filter=' + JSON.stringify(rest_filter);
    } else {
      this.pagination_url = this.clearanceService.requests_rest_url +
        '/count?where=' + JSON.stringify(base_filter);
    }

    console.log('page url', this.pagination_url);
  }

  /**
   * populate requests appropriately from an API
   * should be invoked by pagination
   */
  populateItems(): void {
    this.set_loading_state(true);

    this.clearanceService.getPendingRequests(this.search_filter).subscribe(
      resp => {
        this.set_loading_state(false);
        this.requests = resp;
        console.log('resp', resp);

        this.init_modals();
      },
      err => {
        this.set_loading_state(false);
        this.notifService.error('Something went wrong', null, err);
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
        },
        err => {
          this.notifService.error('Approving Request Failed', null, err);
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

  /**
   * search for specific or group of clearance requests
   * @param event
   */
  doSearch(event): void {
    if (event.hasTerm) {
      this.searching.state = true;

      // create search filter object
      let search_filter = {
        search: {
          student: {}
        }
      };
      search_filter.search.student[event.attribute] = {regexp: event.term};
      this.search_filter = search_filter;
      console.log(event);
      console.log('search_filter', search_filter);

      this.invokePagination();  // populates clearances or requests
    } else {
      this.searching.state = false;
      this.search_filter = null;

      this.invokePagination();  // populates clearances or requests
    }
  }

  /**
   * set loading state of the component
   * @param {boolean} value: the boolean value to be set
   */
  set_loading_state(value: boolean): void {
    if (this.search_filter) {
      this.searching.state = value;
    } else {
      this.loading.state = value;
    }
  }
}
