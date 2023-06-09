import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({

templateUrl: './login.component.html'
})

export class LoginComponent {

  constructor(public authService: AuthService){}
  onLogin(form: NgForm) {
    if (form.invalid){
      return;
    }
    this.authService.login(form.value.userFName, form.value.userLName, form.value.email, form.value.password)
  }

}
