import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-student-view-clearance-progress',
  templateUrl: './student-view-clearance-progress.component.html',
  styleUrls: ['./student-view-clearance-progress.component.css']
})
export class StudentViewClearanceProgressComponent implements OnInit {
  progresses: any[];
  constructor(private api_service: ApiService) { }

  ngOnInit() {
    this.api_service.getRequestsInProgress().subscribe(resp=>{
      this.progresses = resp.json();
      console.log(resp.json());
    });


  }

}
