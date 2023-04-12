import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NewEmployeeComponent } from './employee/employee-add/new-employee.component';

import { EmployeeComponent } from './employee/employee.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'employee', component: EmployeeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'add-employee', component: NewEmployeeComponent},
  { path: 'manage/:postId', component: NewEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
