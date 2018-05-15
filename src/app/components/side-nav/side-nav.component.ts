import {Component, Input, OnInit} from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{

  @Input('user_role') user_role: string;

  constructor() { }
  ngOnInit(){
    $('.sidenav').sidenav();
  }
}
