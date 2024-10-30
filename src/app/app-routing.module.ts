import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReportComponent } from './report/report.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
