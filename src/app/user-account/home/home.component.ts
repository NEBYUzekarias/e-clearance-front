import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  officesList: any[];
  office_of_user: Object = {name:"", description: "",picture:"", id:""};

  constructor(private authService: AuthService,
              private api_service: ApiService) {
    console.log(authService.access_token);


   }

  ngOnInit() {
    var refresh_flag = localStorage.getItem('refresh');

    if(refresh_flag == null){
      location.reload();
      localStorage.setItem('refresh', "yes");
    }
    else{


    }

    if(this.authService.userType("student")){
      this.api_service.getOfficesList().subscribe(resp => {
        this.officesList = resp.json();
      });
    }
    else if(this.authService.userType("office_user")){
      this.api_service.getUserOffice().subscribe(resp =>{
        this.office_of_user = resp.json();

       // console.log("office found "+JSON.stringify());
      });
    }


  }

}
