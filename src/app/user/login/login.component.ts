import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
formModel = {
  UserName : '',
  Password: ''
}
  constructor(private service: UserService, private router: Router, private toaster: ToastrService) { }

  ngOnInit(){
    if(localStorage.getItem('token')!= null)
    this.router.navigateByUrl('/home');
  }

  onSubmit(form: NgForm){
    console.log('1',form.value)
    this.service.login(form.value).subscribe(
      (res:any) => {
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/home');
      },
      (error) =>{
        if(error.status == 400)
        {
          this.toaster.error("Nom d'utilisateur ou mot de passe incorrect", "Erreur d'authentification")
        }
        else 
        {
          console.log(error);
        }
      }
    )
  }
}
