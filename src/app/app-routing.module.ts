import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NewEmployeeComponent } from './employee/employee-add/new-employee.component';

import { EmployeeComponent } from './employee/employee.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'add-employee', component: NewEmployeeComponent, canActivate: [AuthGuard]},
  { path: 'manage/:postId', component: NewEmployeeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
