import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { NgxOtpInputConfig } from "ngx-otp-input";

// import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     return !!(control &&  control.valid && (control.dirty || control.touched) && form.hasError('notMatched'));
//   }
// }
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [MessageService]
})
export class ResetPasswordComponent implements OnInit {
  otp: any;
  FieldTextType: any;
  // public passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/
  // public matcher = new MyErrorStateMatcher();
  // public form!: FormGroup;
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  resetPasswordForm!: FormGroup;
  // newPassword = new FormControl(null, [
  //   (c: AbstractControl) => Validators.required(c),
  //   Validators.pattern(
  //     /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
  //   ),
  // ]);
  // confirmPassword = new FormControl(null, [
  //   (c: AbstractControl) => Validators.required(c),
  //   Validators.pattern(
  //     /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
  //   ),
  // ]);
  setPassword: any;


  // resetPasswordForm = this.formBuilder.group(
  //   {
  //     newPassword: this.newPassword,
  //     confirmPassword: this.confirmPassword,
  //   },

  // );
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
  };
  


  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private messageService: MessageService, private router: Router) {
    // this.formInit();
  }

  ngOnInit(): void {

    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      otp: ['', Validators.required],
      newPassword: ['',[Validators.required, Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      )]]
    })
  }

  toggleFieldTextType() {
    this.FieldTextType = !this.FieldTextType;
  }


  // ConfirmedValidator(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {``
  //     const control = formGroup.controls[controlName];
  //     const matchingControl = formGroup.controls[matchingControlName];
  //     if (
  //       matchingControl.errors &&
  //       !matchingControl.errors['confirmedValidator']
  //     ) {
  //       return;
  //     }
  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ confirmedValidator: true });
  //     } else {
  //       matchingControl.setErrors(null);
  //     }
  //   };
  // }

  // onSubmit(): void {
  //   console.log(this.resetPasswordForm);
  //   if (!this.resetPasswordForm?.valid) {
  //     return;
  //   }
  // }


  // checkPasswords(pw: string, cpw: string) {
  //   this.isConfirmPasswordDirty = true;
  //   if (pw == cpw) {
  //     this.passwordsMatching = true;
  //     this.confirmPasswordClass = 'form-control is-valid';
  //   } else {
  //     this.passwordsMatching = false;
  //     this.confirmPasswordClass = 'form-control is-invalid';
  //   }
  // }

  // public checkingPasswords(formGroup: FormGroup) {
  //   if (
  //     formGroup.controls['newPassword'].value &&
  //     formGroup.controls['confirmPassword'].value &&
  //     formGroup.controls['newPassword'].value &&
  //     formGroup.controls['newPassword'].value.length >= 8 &&
  //     formGroup.controls['newPassword'].value.length <= 16 &&
  //     formGroup.controls['confirmPassword'].value.length >= 8 &&
  //     formGroup.controls['confirmPassword'].value.length <= 16
  //   ) {
  //     return formGroup.controls['newPassword'].value === formGroup.controls['confirmPassword'].value ? false : { "notMatched": true }
  //   }
  //   return false;
  // }

  checkValidations(control: any, type: any) {
    switch (type) {
      case 'special-character':
        return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value);
      case 'number':
        return /\d/.test(control.value);
      case 'lowercase':
        return /[a-z]/.test(control.value);
      case 'uppercase':
        return /[A-Z]/.test(control.value);
      case 'length':
        return control.value.length >= 8 && control.value.length <= 16;
      default:
        return false
    }
  }

  resetPassword() {
    let RP = {
      email: this.resetPasswordForm.value.email,
      // otp:this.resetPasswordForm.value.otp,
      otp: this.otp,
      newPassword: this.resetPasswordForm.value.newPassword
    }


    this.loginService.resetpassword(RP).subscribe((res) => {
      this.setPassword = res;
      console.log(res);

      if (this.setPassword.success === 1) {

        this.messageService.add({ severity: 'success', detail: 'Password Reset Sucessfully' });
        setTimeout(() => {
          this.router.navigateByUrl('/', {
          });
        }, 1000);
      }

      else {
        this.messageService.add({
          severity: 'error',
          detail: "Invalid credentials"
        });
        setTimeout(() => {

        }, 1000);
      }
    },
      (error) => {
        this.messageService.add({
          severity: 'error',
          detail: 'Invalid credentials',
        });
      })


  }




  handleFillEvent(value: string): void {
    console.log(value);
    this.otp = value;
  }
}
