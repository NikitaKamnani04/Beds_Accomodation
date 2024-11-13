
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReportComponent } from './report/report.component';
import { CustomerService } from './report/customer.service';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {PaginatorModule} from 'primeng/paginator';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgxOtpInputModule } from 'ngx-otp-input';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ReportComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,BrowserAnimationsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule, 
    FormsModule,
    PaginatorModule,
    ToastModule,
    BrowserAnimationsModule,
    NgxOtpInputModule

 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
