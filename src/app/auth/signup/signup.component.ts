import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  templateUrl: './signup.component.html'
})

export class SignupComponent {
  constructor(public authService: AuthService){}
  onSignup(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.authService.createUser(form.value.userFName, form.value.userLName, form.value.email, form.value.password)
  }
}
