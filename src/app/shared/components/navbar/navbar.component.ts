import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() account: Account;

  constructor(private authService: AuthService) { }
}
