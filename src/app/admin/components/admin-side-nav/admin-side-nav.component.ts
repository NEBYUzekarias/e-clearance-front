import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.css']
})
export class AdminSideNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.sidenav').sidenav();
  }

}
