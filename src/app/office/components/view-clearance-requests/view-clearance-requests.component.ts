import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import {Request} from "../../../models/request";
import {ClearanceService} from "../../../services/clearance.service";
declare var $: any;
@Component({
  selector: 'app-view-clearance-requests',
  templateUrl: './view-clearance-requests.component.html',
  styleUrls: ['./view-clearance-requests.component.css']
})
export class ViewClearanceRequestsComponent implements OnInit {

  constructor(private authService: AuthService,
              private clearanceService: ClearanceService) { }

  requests: Request[];

  ngOnInit() {
    $('select').formSelect();
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
          console.log('approving resp', resp);
          this.requests.splice(request_index, 1);
        }
      );
  }
}
