import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers:[MessageService]
})
export class LoginPageComponent implements OnInit {
  FieldTextType: any;
  loginForm!: FormGroup;
  signIn: any;

  email:string="";
  password:string="";
  rememberMeChecked:boolean=false;

  constructor(private loginService:LoginService,private messageService:MessageService,private router:Router) { }

  ngOnInit(): void {
    
if(localStorage.getItem('rememberMeChecked') == '1'){
  this.rememberMeChecked =true;
}else{
  this.rememberMeChecked =false;

}


   this.loginForm = new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
   });
  

   if(localStorage?.getItem('email') && localStorage?.getItem('password')){
   this.loginForm.patchValue({
     email:localStorage?.getItem('email') ,
     password: localStorage?.getItem('password')
   })
  }
  }
  
  toggleFieldTextType() {
    this.FieldTextType = !this.FieldTextType;
  }

  loginEmployee(){
    let loginCred={
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    };

    // console.log(loginCred);

    this.loginService.loginData(loginCred).subscribe((res:any)=>{
      this.signIn=res;
      console.log(this.signIn);

      if(this.signIn.success===1)
      {
        this.messageService.add({severity:'success', detail:'Login Sucessful'});
      }
     
      else{
        // this.router.navigate(['/','signIn'])
        this.messageService.add({
          severity:'error',
          detail:"Invalid Credentials"
        })
      }

    })
  }
  

  login(){
    if(this.rememberMeChecked)
    {
      localStorage.setItem('email',this.loginForm.value.email);
      localStorage.setItem('password',this.loginForm.value.password);
      localStorage.setItem('rememberMeChecked','1');
    }
    else
    {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.setItem('rememberMeChecked','0');
    }
    // console.log('login sucessful'); 
  }

  // loginWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  //     .then(() => this.router.navigate(['signIn']));
  // }

  

}
