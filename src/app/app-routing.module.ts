import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { EmployeeComponent } from './employee/employee.component';
import { ManageComponent } from './manage/manage.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'manage', component: ManageComponent},
  { path: 'search', component: SearchComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
