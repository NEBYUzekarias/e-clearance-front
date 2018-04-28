import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-student-side-nav',
  templateUrl: './student-side-nav.component.html',
  styleUrls: ['./student-side-nav.component.css']
})
export class StudentSideNavComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
