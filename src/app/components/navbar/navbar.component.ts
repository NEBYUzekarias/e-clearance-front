import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';

var isOpen = true;
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() account: Account;

  constructor(private authService: AuthService) { }

   toggleSideNav(){
        if(isOpen){
            this.closeSideNav();
            isOpen = false;
        }
        else{
            this.openSideNav();
            isOpen= true;
        }
    }

     openSideNav(){
        document.getElementById('sideNav').style.width = '250px';
        document.getElementById('main').style.marginLeft = '250px';
        // document.getElementById('main').style.marginLeft = 'inherit'
    }

     closeSideNav(){
        document.getElementById('sideNav').style.width = '0';
        document.getElementById('main').style.marginLeft = '0';
        // document.getElementById('main').style.width = '100%'
    }


}
