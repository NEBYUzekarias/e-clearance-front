import { Component, OnInit } from '@angular/core';
import { ClearanceService } from '../../../services/clearance.service';
import { Clearance } from '../../../models/clearance';
import {NotificationService} from '../../../services/notification.service';
import {appConfig} from '../../../app.config';

declare var $: any;

@Component({
  selector: 'app-student-view-clearance-progress',
  templateUrl: './student-view-clearance-progress.component.html',
  styleUrls: ['./student-view-clearance-progress.component.css']
})
export class StudentViewClearanceProgressComponent implements OnInit {
  clearances: Clearance[];

  loading = {
    state: false,
    message: 'Loading clearance progress...',
  };
  states = appConfig.states;
  pagination_url: string;

  constructor(private clearanceService: ClearanceService,
              private notifService: NotificationService) {

    const base_filter = this.clearanceService.getActiveClearancesBaseFilter();

    this.pagination_url =
      `/clearances/count?where=` + JSON.stringify(base_filter);
  }

  ngOnInit() {
    // uncomment the code below to enable interactive collpasibles
    // this.init_collapsibles();
  }

  /**
   * initialize materialize collapsibles component
   * should be called whenever collapsible items are repopulated
   */
  init_collapsibles(): void {
    $('.collapsible').collapsible();
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

    this.clearanceService.getActiveClearances()
      .subscribe(
        resp => {
          this.loading.state = false;
          this.clearances = resp;

          this.init_modals();
        },
        err => {
          this.loading.state = false;
          this.notifService.error(
            'Something went wrong loading clearance progress', null, err);
        }
      );
  }

}
