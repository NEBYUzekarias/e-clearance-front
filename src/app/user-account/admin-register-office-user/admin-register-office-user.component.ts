import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
declare var $: any;
declare var Materialize: any;
@Component({
  selector: 'app-admin-register-office-user',
  templateUrl: './admin-register-office-user.component.html',
  styleUrls: ['./admin-register-office-user.component.css']
})
export class AdminRegisterOfficeUserComponent implements OnInit {
  offices_list: any[] = [{name: "test"}];
  constructor(private authService: AuthService) {

               }

  ngOnInit() {
    // this.api_service.getOfficesList().subscribe(resp=>{
    //   this.offices_list = resp.json();
    // })
    $('select').material_select();

  }

}
