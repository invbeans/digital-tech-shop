import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse } from 'src/app/shared/models/auth-response';
import { LoginUser, RegistrationUser } from 'src/app/shared/models/user-auth-forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  isLogin = true
  LOGIN_TEXT = "Логин"
  REGISTRATION_TEXT = "Регистрация"
  choiceBtnText = this.LOGIN_TEXT
  registrationForm: FormGroup
  loginForm: FormGroup
  errorMessage = ""

  registrationUser = new RegistrationUser("", "", "", "", new Date(), "", "", "", 0)
  loginUser = new LoginUser("", "")

  constructor(private authService: AuthService) {
    this.registrationForm = new FormGroup({
      "surname": new FormControl("", Validators.required),
      "lastname": new FormControl("", Validators.required),
      "username": new FormControl(""),
      "firstname": new FormControl("", Validators.required),
      "email": new FormControl("", Validators.required),
      "phone_number": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required),
      "birthday_date": new FormControl(new Date(), Validators.required),
    })


    this.loginForm = new FormGroup({
      "email": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required)
    })

  }

  toggleButton() {
    this.isLogin = !this.isLogin
    this.choiceBtnText = (this.isLogin) ? this.LOGIN_TEXT : this.REGISTRATION_TEXT
  }

  login() {
    this.errorMessage = ""
    this.loginUser = new LoginUser(this.loginForm.value.email, this.loginForm.value.password)
    this.authService.login(this.loginUser).subscribe((data: any) => {
      if(typeof data === "string") this.errorMessage = data
    })
  }

  registration() {
    let tempUsername = this.registrationForm.value.username
    if (tempUsername == "") tempUsername = this.registrationForm.value.firstname
    this.errorMessage = ""
    this.registrationUser = new RegistrationUser(this.registrationForm.value.firstname,
      this.registrationForm.value.surname,
      this.registrationForm.value.lastname,
      tempUsername,
      this.registrationForm.value.birthday_date,
      this.registrationForm.value.email,
      this.registrationForm.value.password,
      this.registrationForm.value.phone_number,
      0)
    this.authService.registration(this.registrationUser).subscribe((data: any) => {
      if(typeof data === "string") this.errorMessage = data
    })
  }
}
