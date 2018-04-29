import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
declare var $: any;
declare var Materialize: any;
@Component({
  selector: 'app-student-request-clearance',
  templateUrl: './student-request-clearance.component.html',
  styleUrls: ['./student-request-clearance.component.css']
})
export class StudentRequestClearanceComponent implements OnInit {

  ids: string[];
  offices: any[];
  constructor(private authService: AuthService,
              private api_service: ApiService) {
    //console.log(authService.getAccessToken());
    this.api_service.getOfficesList().subscribe(resp=>{
      this.offices = resp.json();
     // Materialize.toast("Got the items", 5000);
      //console.log(JSON.stringify(resp.json()));
    });
  }

  ngOnInit() {
    $('select').material_select();

  }

  test(param){
   this.ids.push(param.value);
  }

  processSubmit(form_data){
    // quirk handling for clash between materialize and angular
    var ac_year = ($('#ac_year').val() == null) ? "2016/17" : $('#ac_year').val();
    var semester = ($('#semester').val() == null) ? "I" : $('#semester').val();
    var year = ($('#year').val() == null) ? "I" : $('#year').val();

    var reason = $('#reason').val();
    var library = $('#Library').is(':checked');
    var dormitory = $('#Dormitory').is(':checked');
    var registrar = $('#Registrar').is(':checked');

    var userId = '1';

    var url = "http://localhost:3000/api/requests";
    var common_data = {
      academic_year: ac_year,
      student_year: year,
      semester: semester,
      reason_for_clearance: reason,
      userId: userId,
    }

    if(library){
      common_data['officeId'] = "AAiT Library";

      $.post({
        url: url,
        data: common_data,
        success: function(){
          Materialize.toast("Successfully submitted to library", 5000);
        }
      });
    }

    if(dormitory){
      common_data['officeId'] = "AAiT Dormitory";

      $.post({
        url: url,
        data: common_data,
        success: function(){
          Materialize.toast("Successfully submitted to dormitory", 5000);
        }
      });
    }

    if(registrar){
      common_data['officeId'] = "AAiT Registrar";

      $.post({
        url: url,
        data: common_data,
        success: function(){
          Materialize.toast("Successfully submitted to Registrar", 5000);
        }
      });
    }

    // Materialize.toast("Successfully submitted", 5000);
  }

}
