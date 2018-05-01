import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './user-account/home/home.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { StudentRequestClearanceComponent } from './student/components/student-request-clearance/student-request-clearance.component';
import { StudentViewClearanceProgressComponent } from './student/components/student-view-clearance-progress/student-view-clearance-progress.component';
import { ViewClearedRequestsComponent } from './office/components/view-cleared-requests/view-cleared-requests.component';
import { ViewClearanceRequestsComponent } from './office/components/view-clearance-requests/view-clearance-requests.component';
import { OfficeDetailsComponent } from './user-account/office-details/office-details.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { AdminImportStudentDataComponent } from './user-account/admin-import-student-data/admin-import-student-data.component';
import { AdminRegisterOfficeUserComponent } from './user-account/admin-register-office-user/admin-register-office-user.component';
import { AdminRegisterStudentComponent } from './user-account/admin-register-student/admin-register-student.component';
import { AdminAddNewOfficeComponent } from './user-account/admin-add-new-office/admin-add-new-office.component';
import {LoginGuard} from "./guards/login.guard";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AccessTokenAuthInterceptor} from "./interceptors/accessTokenAuth.interceptor";
import {NotificationService} from "./services/notification.service";
import { CustomerComponent } from './components/customer/customer.component';
import {StudentModule} from "./student/student.module";
import {AccountService} from "./services/account.service";
import {StudentGuard} from "./guards/student.guard";
import {OfficeModule} from "./office/office.module";
import {OfficeGuard} from "./guards/office.guard";
import {ClearanceService} from "./services/clearance.service";
import {OfficeService} from "./services/office.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerComponent,
    NavbarComponent,
    TestComponent,
    HomeComponent,
    SideNavComponent,
    OfficeDetailsComponent,
    AdminImportStudentDataComponent,
    AdminRegisterOfficeUserComponent,
    AdminRegisterStudentComponent,
    AdminAddNewOfficeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    OfficeModule,
    StudentModule,
    AppRoutingModule,
  ],
  providers: [
    LoginGuard,
    StudentGuard,
    OfficeGuard,
    AuthService,
    NotificationService,
    AccountService,
    ClearanceService,
    OfficeService,
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenAuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
