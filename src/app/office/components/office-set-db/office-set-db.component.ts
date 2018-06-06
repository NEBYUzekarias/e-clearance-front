import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SourceService} from "../../../services/source.service";
import {NotificationService} from "../../../services/notification.service";

declare var $: any;

@Component({
  selector: 'app-admin-set-db',
  templateUrl: './office-set-db.component.html',
  styleUrls: ['./office-set-db.component.css']
})
export class OfficeSetDbComponent implements OnInit {

  form: FormGroup;
  port: FormControl;

  // whether port is set customly or not
  // in null case, don't know because of network error
  portEnabled: boolean = null;

  // whether setting is found or not,
  // in null case, don't know because of network error
  settingFound: boolean = null;

  setting: any = null;

  constructor(private sourceService: SourceService,
              private notifService: NotificationService) { }

  ngOnInit() {
    // setup form text input controls
    this.form = new FormGroup({
      host: new FormControl('', [
        Validators.required,
      ]),
      user: new FormControl('', Validators.required),
      password: new FormControl(''),
      database: new FormControl('', Validators.required),
      table: new FormControl('', Validators.required),
      studentId: new FormControl('', Validators.required),
      reason: new FormControl('', Validators.required),
    });

    this.port = new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(65535),
    ]);

    // fetch any database settings that is already setup
    this.sourceService.getSource()
      .subscribe(
        resp => {
          if (resp.length === 1) {
            // found database setting for the department
            this.populateSetting(resp[0]);
          } else if (resp.length === 0) {
            // no database setting found for the department
            this.settingFound = false;
            this.setting = null;
          } else {
            // this else case will not happen because
            // backend will not return array with many objects
            this.notifService.error(
              'Many database settings were found.\nContact your system administrator.');
          }
          console.log('resp: ', resp);

          this.init_select();
        },
        err => {
          console.log('err: ', err);
        }
      );
  }

  /**
   * initialize materialize select controls(very shameful code)
   */
  init_select() {
    $(document).ready(function () {
      $('select').formSelect();
    });
  }

  /**
   * populate settings appropriately
   * @param settings
   */
  populateSetting(settings) {
    this.setting = settings;

    if (settings.port) {
      this.form.setControl('port', this.port);
      this.portEnabled = true;
    }

    let form_values = {};
    Object.assign(settings, form_values);
    // delete departmentId if specified
    delete form_values.departmentId;
    delete form_values.client;

    this.form.setValue(settings);
    this.settingFound = true;

    this.init_select();
  }

  /**
   * Enable or disable to set port number
   */
  togglePortSetting(): void {
    if (this.portEnabled) {
      this.form.setControl('port', this.port);
    } else {
      this.form.removeControl('port');
    }

    this.portEnabled = !this.portEnabled;
  }

  /**
   * Update database configurations based on settings
   */
  updateDbConfig() {
    let source = this.form.value;
    source.client = $('#clients').val();

    this.sourceService.updateSource(source)
      .subscribe(
        resp => {
          if (resp.count) {
            this.notifService.success('Successfully updated database setting');
          } else {
            this.notifService.error(
              'Something went wrong trying to update the setting.\nPlease, try again.');
          }

          console.log('resp: ', resp);
        },
        err => {
          console.log('err: ', err);
        }
      );
  }

  /**
   * create new db config in backend
   */
  createDbConfig() {
    let source = this.form.value;
    source.client = $('#clients').val();

    this.sourceService.createSource(source)
      .subscribe(
        resp => {
          this.notifService.success('Successfully created database settings');

          this.populateSetting(resp);
        },
        err => {
          console.log('c err:', err);
        }
      );
  }

}
