import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

var isOpen = true;
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
            document.getElementById("main").style.marginLeft = '250px';
            document.getElementById("main").style.marginTop = '-1.6%';
            document.getElementById("main").style.width = '80%';
    
    }
  }
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
