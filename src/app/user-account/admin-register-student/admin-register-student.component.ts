import { Component, OnInit } from '@angular/core';
import {Http , Response} from '@angular/http';
declare var $: any;
declare var Materialize: any;
@Component({
  selector: 'app-admin-register-student',
  templateUrl: './admin-register-student.component.html',
  styleUrls: ['./admin-register-student.component.css']
})
export class AdminRegisterStudentComponent implements OnInit {

  constructor(private http:Http) { }

  ngOnInit() {
    $('select').material_select();
  }

  onSubmit(parameter){

    var newData = parameter.value;
    var testEmail = newData.first_name+"@domain.com"
  var data = {
    first_name: newData.first_name,
    middle_name: "test",
    last_name: newData.last_name,
    user_type: "student",
    department: "test",
    realm: "test",
    username: newData.username,
    password: "pass",
    email: testEmail,
    emailVerified: true,
    officeId:"test"
  }


  this.http.post('http://localhost:3000/api/users',{
    first_name: newData.first_name,
    middle_name: "test",
    last_name: newData.last_name,
    user_type: "student",
    department: "test",
    realm: "test",
    username: newData.username,
    password: "pass",
    email: testEmail,
    emailVerified: true,
    officeId:"test"
  }).subscribe((res:Response)=>{
    Materialize.toast("Successfully registered a student", 5000);
  })

  // this.api_service.adminRegisterStudent(JSON.stringify(data)).subscribe(resp =>{
  //   console.log(resp);
  // });

  }

}
