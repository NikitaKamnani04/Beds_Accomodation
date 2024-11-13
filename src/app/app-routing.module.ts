import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReportComponent } from './report/report.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path:'',
    component:LoginPageComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path:'report',
    component:ReportComponent
  },
  {
    path:'forgotpassword',
    component:ForgotPasswordComponent
  },
  {
    path:'resetpassword',
    component:ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
