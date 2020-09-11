import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from '../app/auth/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'/user/login', pathMatch:'full'},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'user', component:UserComponent,
  children: [
  {path:'registration', component:RegistrationComponent},
  {path:'login', component:LoginComponent}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
