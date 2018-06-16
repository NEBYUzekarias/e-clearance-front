import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Account} from '../../../models/account';
import {OfficeService} from '../../../services/office.service';
import {DebtList} from '../../../models/debt-list';
import {FileResolver} from 'codelyzer/angular/fileResolver/fileResolver';
import {NotificationService} from '../../../services/notification.service';

declare var $, XLSX: any;

@Component({
  selector: 'app-office-home',
  templateUrl: './office-home.component.html',
  styleUrls: ['./office-home.component.css']
})
export class OfficeHomeComponent implements OnInit {

  account: Account = null;
  debtList: DebtList[];

  constructor(private authService: AuthService,
              private officeService: OfficeService,
              private notifier: NotificationService) {
    this.account = this.authService.account;
  }

  ngOnInit() {
    this.officeService.getOfficeDebtList()
      .subscribe(
        resp => {
          this.debtList = resp;
        },
        err => {
          this.notifier.error('Could not load debt lists', null, err);
        }
      );
  }

  setDebtListFile(event) {
    console.log(event.target.files[0]);
    const excelReadPromise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(event.target.files[0]);
      // console.log(reader.toLocaleString());
      reader.onload = function () {
        const data = new Uint8Array(reader.result);
        const arr = new Array();
        for (let i = 0; i < data.length; i++) {
          arr[i] = String.fromCharCode(data[i]);
        }
        const arr_with_string = arr.join('');
        const wb = XLSX.read(arr_with_string, {type: 'binary'});
        const first_sheet_name = wb.SheetNames[0];

        const work_sheet = wb.Sheets[first_sheet_name];

        const final_output = XLSX.utils.sheet_to_json(work_sheet);
        resolve(final_output);
      };
    });
    excelReadPromise.then((output: any) => {
      const debtList: DebtList[] = new Array();
      for (let i = 0; i < output.length; i++) {
        debtList.push(<DebtList>{
          student_id: output[i].student_id.trim().toLowerCase(),
          office_name: this.account.department.name,
          full_name: output[i].full_name,
          department: output[i].department,
          reason: output[i].reason
        });
      }
      this.officeService.updateDebtList(debtList)
        .subscribe(
          resp => {
            this.debtList = resp;
            this.authService.account.department.debt_list = true;
            this.notifier.success('Successfuly updated office debt list', null);
          },
          err => {
            this.notifier.error('Error while updating debt list', null, err);
          }
        );
    });
  }

  updateSingleEntry(index, debtList: DebtList, debt_id) {
    const update = [];
    // console.log($(`#${index}1`).val());
    for (let i = 1; i <= 4; i++) {
      update.push($(`#${index}${i}`).val());
    }
    debtList.id = debt_id
    debtList.student_id = update[0];
    debtList.full_name = update[1];
    debtList.department = update[2];
    debtList.office_name = this.account.department.name;
    debtList.reason = update[3];

    this.officeService.updateSingleDebtList(debtList)
      .subscribe(
        resp =>{
          this.notifier.success('Successfully updated', null);
        },
        err =>{
          this.notifier.error('Error while updating debt', null, err);
        }
      );
  }

  deletDebt(index, id: string) {
    this.officeService.deleteSingleDebtList(id)
      .subscribe(
        resp => {
          this.debtList.splice(index, 1);
          this.notifier.success('Successfully deleted', null);
        },
        err => {
          this.notifier.error('Error while deleting debt list', null, err);
        }
      );
  }


}
