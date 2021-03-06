import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './user-account/home/home.component';
import { OfficeDetailsComponent } from './user-account/office-details/office-details.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminImportStudentDataComponent } from './user-account/admin-import-student-data/admin-import-student-data.component';
import { AdminRegisterOfficeUserComponent } from './user-account/admin-register-office-user/admin-register-office-user.component';
import { AdminRegisterStudentComponent } from './user-account/admin-register-student/admin-register-student.component';
import { AdminAddNewOfficeComponent } from './user-account/admin-add-new-office/admin-add-new-office.component';
import {LoginGuard} from './guards/login.guard';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AccessTokenAuthInterceptor} from './interceptors/accessTokenAuth.interceptor';
import {NotificationService} from './services/notification.service';
import { CustomerComponent } from './components/customer/customer.component';
import {StudentModule} from './student/student.module';
import {AccountService} from './services/account.service';
import {StudentGuard} from './guards/student.guard';
import {OfficeModule} from './office/office.module';
import {OfficeGuard} from './guards/office.guard';
import {ClearanceService} from './services/clearance.service';
import {OfficeService} from './services/office.service';
import {SharedModule} from './shared/shared.module';
import {PaginationService} from './services/pagination.service';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';
import {AdminModule} from './admin/admin.module';
import {AdminGuard} from './guards/admin.guard';
import {SourceService} from "./services/source.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerComponent,
    TestComponent,
    HomeComponent,
    OfficeDetailsComponent,
    AdminImportStudentDataComponent,
    AdminRegisterOfficeUserComponent,
    AdminRegisterStudentComponent,
    AdminAddNewOfficeComponent,
    AdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    OfficeModule,
    StudentModule,
    AdminModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    LoginGuard,
    StudentGuard,
    OfficeGuard,
    AdminGuard,
    AuthService,
    NotificationService,
    AccountService,
    ClearanceService,
    SourceService,
    OfficeService,
    PaginationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenAuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
