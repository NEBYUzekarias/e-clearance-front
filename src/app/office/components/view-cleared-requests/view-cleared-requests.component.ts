import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
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
      optValue: 'username',
      optDisplay: 'By student id'
    },
    {
      optValue: 'departmentId',
      optDisplay: 'By department'
    }
  ];

  loading = {
    state: false,
    message: 'Loading...',
  };

  searching = {
    state: false,
    message: 'Searching...',
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

  requests: Request[];

  ngOnInit() {
    this.invokePagination();  // populates clearances or requests
  }

  invokePagination(): void {
    const base_filter = this.clearanceService.getClearedRequestsBaseFilter();

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

    this.clearanceService.getClearedRequests(this.search_filter).subscribe(
      resp => {
        this.set_loading_state(false);
        this.requests = resp;
      },
      err => {
        this.set_loading_state(false);
        this.notifService.error('Something went wrong', null, err);
      }
    );
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
      console.log('event', event);
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
