import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './guest/login/login.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './user-account/home/home.component';
import { SideNavComponent } from './user-account/side-nav/side-nav.component';
import { StudentRequestClearanceComponent } from './user-account/student-request-clearance/student-request-clearance.component';
import { StudentViewClearanceProgressComponent } from './user-account/student-view-clearance-progress/student-view-clearance-progress.component';
import { ViewClearedRequestsComponent } from './user-account/view-cleared-requests/view-cleared-requests.component';
import { ViewClearanceRequestsComponent } from './user-account/view-clearance-requests/view-clearance-requests.component';
import { OfficeDetailsComponent } from './user-account/office-details/office-details.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { AdminImportStudentDataComponent } from './user-account/admin-import-student-data/admin-import-student-data.component';
import { AdminRegisterOfficeUserComponent } from './user-account/admin-register-office-user/admin-register-office-user.component';
import { AdminRegisterStudentComponent } from './user-account/admin-register-student/admin-register-student.component';
import { AdminAddNewOfficeComponent } from './user-account/admin-add-new-office/admin-add-new-office.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    TestComponent,
    HomeComponent,
    SideNavComponent,
    StudentRequestClearanceComponent,
    StudentViewClearanceProgressComponent,
    ViewClearedRequestsComponent,
    ViewClearanceRequestsComponent,
    OfficeDetailsComponent,
    AdminImportStudentDataComponent,
    AdminRegisterOfficeUserComponent,
    AdminRegisterStudentComponent,
    AdminAddNewOfficeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
