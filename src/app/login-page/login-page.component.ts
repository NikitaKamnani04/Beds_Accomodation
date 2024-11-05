import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var $:any;
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers:[MessageService]
})
export class LoginPageComponent implements OnInit {
 
  FieldTextType: any;
  loginForm!: FormGroup<any>;
  signIn: any;
  email:string="" ;
  password:string="";
  rememberMeChecked:any=false;
 
  constructor(private loginService:LoginService,private messageService:MessageService,private router:Router,private _cookieService:CookieService) {
   
   }

 
  ngOnInit(): void {
    this.loginForm = new FormGroup({
          email:new FormControl(''),
          password:new FormControl('')
         });
// if(localStorage.getItem('rememberMeChecked') == '1'){
//   this.rememberMeChecked =true;
// }
// else{
//   this.rememberMeChecked =false;
// }

//    this.loginForm = new FormGroup({
//     email:new FormControl(''),
//     password:new FormControl('')
//    });
  

//    if(localStorage?.getItem('email') && localStorage?.getItem('password')){
//    this.loginForm.patchValue({
//      email:localStorage?.getItem('email') ,
//      password: localStorage?.getItem('password')
//    })
//   }
this.rememberMeChecked = this.getCookie('rememberMe');
console.log(this.rememberMeChecked);

  }


  onLoggedIn(){

  }
  
  toggleFieldTextType() {
    this.FieldTextType = !this.FieldTextType;
  }

  loginEmployee(){
 
    let a = $("#email").val();
    let b =$("#password").val();
  
    
    let loginCred={
      email: a ,
      password:b
    };

    // console.log(loginCred);

    this.loginService.loginData(loginCred).subscribe((res:any)=>{
      this.signIn=res;
      console.log(this.signIn);

      if(this.signIn.success===1)
      {
        this.messageService.add({severity:'success', detail:'Login Sucessful'});
        setTimeout(() => {
          this.router.navigateByUrl('/report', {
          });
        }, 100);    
      }
 
      else{
        this.messageService.add({
          severity:'error',
          detail:"Invalid Credentials"
        });
        setTimeout(() => {
         
        }, 100); 
      }
    },
    (error) => {
      this.messageService.add({
        severity: 'error',
        detail: 'Invalid Credentials',
      });
    })
  }
  


  // login(){
  //   if(this.rememberMeChecked)
  //   {
  //     localStorage.setItem('email',this.loginForm.value.email);
  //     localStorage.setItem('password',this.loginForm.value.password);
  //     localStorage.setItem('rememberMeChecked','1');
  //   }
  //   else
  //   {
  //     localStorage.removeItem('email');
  //     localStorage.removeItem('password');
  //     localStorage.setItem('rememberMeChecked','0');
  //   }
  // }

  
  // console.log('login sucessful'); 

  // loginWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  //     .then(() => this.router.navigate(['signIn']));
  // }




  cleanAll() {
    localStorage.clear();
  }
  
 

   

 setcookie() {
   this.rememberMeChecked  = ! this.rememberMeChecked;
   var r = this.rememberMeChecked;
   console.log(r);
   if (r == true) {
  var u = $("#email").val();
  var p =$("#password").val();
  document.cookie = "email=" + u + ";path=http://localhost:4200";
  document.cookie = "password=" + p + ";path=http://localhost:4200";
  document.cookie = "rememberMe=yes;path=http://localhost:4200";


}
else {
  document.cookie = "rememberMe=no;path=http://localhost:4200";
  document.cookie = "email=;path=http://localhost:4200";
  document.cookie = "password=;path=http://localhost:4200";
}
}
 getCookie(name:any) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}
}
