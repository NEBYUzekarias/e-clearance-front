import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Info} from '../../../models/Info';
import {Clearance} from '../../../models/clearance';
import {ClearanceService} from '../../../services/clearance.service';

@Component({
  selector: 'app-admin-set-info',
  templateUrl: './admin-set-info.component.html',
  styleUrls: ['./admin-set-info.component.css']
})
export class AdminSetInfoComponent implements OnInit {
  infos: object = {academic_year: 'Fetching...', semester: 'Fetching...'};
  form = new FormGroup({
    academic_year: new FormControl(),
    semester: new FormControl()
  });
  constructor(
    private clearanceService: ClearanceService
  ) { }

  ngOnInit() {
    this.clearanceService.getCurrentInfos()
      .subscribe(
        resp =>{
          this.infos = resp;
        }
      )
  }

  doUpdateInfos(){

  }

}
