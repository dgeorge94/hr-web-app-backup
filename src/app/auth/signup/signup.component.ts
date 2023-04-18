import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {AuthService} from "../auth.service";
import { Subscription } from "rxjs";

@Component({
  templateUrl: './signup.component.html'
})

export class SignupComponent {
  private authStatusSub: Subscription;
  constructor(public authService: AuthService){}


  onSignup(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.authService.createUser(form.value.email, form.value.password)
  }


}
