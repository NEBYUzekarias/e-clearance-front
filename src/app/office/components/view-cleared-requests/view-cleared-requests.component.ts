import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {ClearanceService} from "../../../services/clearance.service";
import {Request} from "../../../models/request";

@Component({
  selector: 'app-view-cleared-requests',
  templateUrl: './view-cleared-requests.component.html',
  styleUrls: ['./view-cleared-requests.component.css']
})
export class ViewClearedRequestsComponent implements OnInit {

  constructor(private authService: AuthService,
              private clearanceService: ClearanceService) { }

  requests: Request[];

  ngOnInit() {
    this.clearanceService.getClearedRequests().subscribe(
      resp => {
        this.requests = resp;
      }
    );
  }

}
