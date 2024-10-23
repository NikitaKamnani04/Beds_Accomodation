import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReportComponent } from './report/report.component';
// import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path:'signIn',
    component:LoginPageComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path:'',
    component:ReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
