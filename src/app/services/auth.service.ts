import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService implements OnInit {
 
  private auth_api_path = "http://localhost:3000/api/users";
  private token;
  private loggedIn = false;
 
  constructor(private http: Http,
              private router: Router) {
    var auth_data = localStorage.getItem("auth");

    if(auth_data != null){
      this.token = JSON.parse(auth_data);
      this.loggedIn = true; 
      this.router.navigate(['/home']);
    }
    else{
      this.loggedIn = false;
      this.token = "";
      this.router.navigate(['/login']);

    }
  }

  logIn(credentials) {

    return this.http.post(this.auth_api_path+"/login?include=user",credentials);

  }

  getToken(){
    return this.token;
  }

  logOut() {

    localStorage.clear();
    this.router.navigate(['/login']);

  }

  ngOnInit() {
    
  }

  userName(){
    return this.token.user.username;
    //console.log(this.token);
  }
  getUserId(){
    return this.token.user.id;
  }
  getUserAccessToken(){
    return this.token.id;
  }

  userType(userType: string): boolean{
    return (this.token.user.user_type == userType);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
  getOfficeType(userId){
    
  }

  

}
