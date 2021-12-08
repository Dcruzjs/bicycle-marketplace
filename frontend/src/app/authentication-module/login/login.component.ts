import { Component, OnInit } from '@angular/core';
import { validateEmail, validatePass } from "../utils/validations";
import { errorLogInMsgs, logInUser, UserResponse } from '../interfaces/User.interface';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  logInUser: logInUser ={
    email:"name@example.com",
    password: "Geek@2021"
  }

  errorMessages: errorLogInMsgs = {
    emailError:"",
    passError:""
  }
  constructor(
    private _usersService: UserService ,
    private _router:Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  validateLogIn():boolean{
    if(!validateEmail(this.logInUser.email)){
      this.errorMessages.emailError = "Invalid email!";
      console.log(this.errorMessages.emailError)
      return false;
    }
    
    if(!validatePass(this.logInUser.password)) {
    this.errorMessages.passError = "Invalid password, your password must be at least 8 characters long and have Uppercase and Lowecase letters, besides special characters ('!#$%&') and Numbers(0-9)"
      console.log(this.errorMessages.passError)
      return false
    }

    return true
  }

  logIn(){
    if(this.validateLogIn()){
      this._usersService.loginUser(this.logInUser)
        .subscribe( (resp: UserResponse) => {
          const { _id, email, firstName, lastName } = resp.userDB
          const user = { _id, email, firstName, lastName }
          localStorage.setItem("user", JSON.stringify(user) )
          this._usersService.loggedInUser = user
    
          this._router.navigate(["list"])
        },
        error => this.errorMessages.emailError = error.statusText)

    }
  }



}
