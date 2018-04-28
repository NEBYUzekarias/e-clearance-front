import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-view-clearance-requests',
  templateUrl: './view-clearance-requests.component.html',
  styleUrls: ['./view-clearance-requests.component.css']
})
export class ViewClearanceRequestsComponent implements OnInit {

  constructor(private authService: AuthService, private api_service: ApiService) { }
  office_of_user: Object = {name:"", description: "",picture:"", id:""};
  office_requests: any[];
  ngOnInit() {
    this.api_service.getUserOffice().subscribe(resp =>{
      this.office_of_user = resp.json();
      console.log(resp.json());
      this.api_service.getOfficeRequest(resp.json().name).subscribe(resp=>{
        this.office_requests =resp.json();
        console.log(resp.json());
      })
  });
}

}
