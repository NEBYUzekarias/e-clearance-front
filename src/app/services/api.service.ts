import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';

@Injectable()
export class ApiService {

  private api_end_path = "http://localhost:3000/api/";

  constructor(private authService: AuthService,
              private http: Http) { 

              }
//for studnet user home              
getOfficesList(){
  return this.http.get(this.api_end_path+"offices");
}

//for each office user home
getUserOffice(){
  return this.http.get(this.api_end_path+"offices/"+this.authService.getToken().user.officeId);
}

//for student user to send request to an office of their choice
sendClearanceRequest(){
  return this.http.get(this.api_end_path+"requests?filter[where][userId]="+this.authService.getUserId());
}

getOfficeRequest(officeId){
  return this.http.get(this.api_end_path+"requests?filter[where][officeId]="+officeId);
}

//for student user to see requst progress

getRequestsInProgress(){
  return this.http.get(this.api_end_path+"requests?filter[where][userId]="+this.authService.getUserId());
}

//for student user to see cleared requests
adminRegisterStudent(params){
  return this.http.post(this.api_end_path+"users",params);
}

}
