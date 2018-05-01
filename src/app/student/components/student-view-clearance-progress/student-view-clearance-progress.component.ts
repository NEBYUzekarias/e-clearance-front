import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ClearanceService } from '../../../services/clearance.service';
import { Clearance } from '../../../models/clearance';
declare var Materialize: any;
@Component({
  selector: 'app-student-view-clearance-progress',
  templateUrl: './student-view-clearance-progress.component.html',
  styleUrls: ['./student-view-clearance-progress.component.css']
})
export class StudentViewClearanceProgressComponent implements OnInit {
  clearances: Clearance[];

  constructor(private clearanceService: ClearanceService) { }

  ngOnInit() {

    this.clearanceService.getActiveClearances()
      .subscribe(
        resp => {
          this.clearances = resp;
          console.log(resp);
          
        },
        err => {
          Materialize.toast("Error: while getting list of progresses", 4000);
        }

      );


  }

}
