import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseUrl= 'http://localhost:53199/api';
  formModel = this.fb.group(
    {
      UserName: ['', Validators.required],
      Email: ['',Validators.email],
      FullName: [''],
      Passwords : this.fb.group({
        Password: ['', [Validators.required,Validators.minLength(4)]],
        ConfirmPassword: ['',Validators.required]
      }, {validator: this.ComparePasswords})
      
    }
  )

  ComparePasswords(fg: FormGroup){
    let confirmPswordCtrl = fg.get('ConfirmPassword');
    //test si mot de passe sont équivalents
    if(confirmPswordCtrl.errors == null || 'passwordMismatch' in confirmPswordCtrl.errors){
      if(fg.get('Password').value != confirmPswordCtrl.value){
        confirmPswordCtrl.setErrors({passwordMismatch: true});
      }
      else {
        confirmPswordCtrl.setErrors(null);
      }
    }
  }

  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    }
   return this.http.post(this.BaseUrl+'/ApplicationUser/Register', body)
  }
}
