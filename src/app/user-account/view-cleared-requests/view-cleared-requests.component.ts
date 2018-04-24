import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-cleared-requests',
  templateUrl: './view-cleared-requests.component.html',
  styleUrls: ['./view-cleared-requests.component.css']
})
export class ViewClearedRequestsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
