import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { MessageService } from 'primeng/api';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers:[MessageService]
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassword!:FormGroup;
  getOtp:any;
  constructor(private loginService:LoginService,private messageService:MessageService,private router:Router) { }

  ngOnInit(): void {

    this.forgotPassword=new FormGroup({
      email:new FormControl('')
    })

    
  }

  ForgotPass(){
      let FP={
        email:this.forgotPassword.value.email
      };

      this.loginService.forgotPassword(FP).subscribe((res)=>{
        this.getOtp=res;
        console.log(res);

        if(this.getOtp.success===1)
          {
            
            this.messageService.add({severity:'success', detail:'Otp Sent Sucessfully'});
            setTimeout(() => {
              this.router.navigateByUrl('/resetpassword', {
              });
            }, 1000);    
          }
     
          else{
            this.messageService.add({
              severity:'error',
              detail:"Invalid email"
            });
            setTimeout(() => {
             
            }, 1000); 
          }
          
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          detail: 'Invalid email',
        });
      }
    )
  }


  
}
