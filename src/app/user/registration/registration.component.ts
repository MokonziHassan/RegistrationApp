import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res: any) => {
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('Vous êtes enregistrés', 'Réussite de l\'enregistrement');
        }
        else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                //le nom d'utilisateur est déjà pris
                this.toastr.error('Ce nom d\'utilisateur est déjà pris','Echec de l\'enregistrement')
                break;
            
              default:
                //Echec de l'enregistrement
                this.toastr.error(element.description,'Echec de l\'enregistrement')
                break;
            }
          });
        }
      },
      err =>{
        console.log(err);
        
      }
    )
  }
}
