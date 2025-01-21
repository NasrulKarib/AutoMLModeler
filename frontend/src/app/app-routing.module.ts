import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './Authentication/signup/signup.component'; // Import SignupComponent
import { LoginComponent } from './Authentication/login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ForgetPassComponent } from './Authentication/login/forget-pass/forget-pass.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'forget', component: ForgetPassComponent },
  
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
