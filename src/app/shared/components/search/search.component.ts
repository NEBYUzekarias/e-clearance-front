import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
declare var $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  userType = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    $('select').formSelect();
    
  }

}
