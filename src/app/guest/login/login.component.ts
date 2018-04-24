import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = false;
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  }); 

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    var log_out_refresh = localStorage.getItem('logout_refresh');

    if(log_out_refresh == null){
      location.reload();
      localStorage.setItem('logout_refresh', 'yes');
    }
    else{
      localStorage.clear();
    } 
  }

  processLogin(){
    this.authService.logIn(this.form.value).subscribe(resp =>{
      console.log(this.form.value);
     // console.log(resp.json().username);
      localStorage.setItem('auth', JSON.stringify(resp.json()));
      this.router.navigate(['/home']);  
    },err=>{
        this.error = true;
    });
  }

}
