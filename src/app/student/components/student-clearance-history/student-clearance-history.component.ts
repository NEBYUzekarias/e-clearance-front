import { Component, OnInit } from '@angular/core';
import {Clearance} from '../../../models/clearance';
import {ClearanceService} from '../../../services/clearance.service';
import {NotificationService} from '../../../services/notification.service';
import {appConfig} from '../../../app.config';

declare var $: any;

@Component({
  selector: 'app-student-clearance-history',
  templateUrl: './student-clearance-history.component.html',
  styleUrls: ['./student-clearance-history.component.css']
})
export class StudentClearanceHistoryComponent implements OnInit {
  clearances: Clearance[];

  states = appConfig.states;
  loading = {
    state: false,
    message: 'Loading clearance history...',
  };

  pagination_url: string;

  constructor(private clearanceService: ClearanceService,
              private notifService: NotificationService) {

    const base_filter = this.clearanceService.getClearanceHistoryBaseFilter();

    this.pagination_url =
      `/clearances/count?where=` + JSON.stringify(base_filter);
  }

  ngOnInit() {
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

  populateClearances() {
    this.loading.state = true;

    this.clearanceService.getClearanceHistory()
      .subscribe(
        resp => {
          this.loading.state = false;

          this.clearances = resp;
          this.init_modals();
        },
        err => {
          this.loading.state = false;

          this.notifService.error(
            'Something went wrong getting clearance history', null, err);
        }
      );
  }

}
