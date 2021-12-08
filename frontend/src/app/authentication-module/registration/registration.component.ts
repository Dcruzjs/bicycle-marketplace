import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { newUser, errorMsgs, UserResponse } from '../interfaces/User.interface';
import { UserService } from '../user.service';
import { validateEmail, validatePass } from "../utils/validations";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {

  newUser: newUser = {
    firstName: "Daniel",
    lastName : "Cruz",
    email : "name@example.com",
    password : "Geek@2021",
    passwordConfirmation : "Geek@2021",
  }
  errorMessages: errorMsgs ={
  fNameError: "",
  lNameError: "",
  emailError: "",
  passError: "",
  passConfError: "",

}

  constructor(
    private _usersService: UserService ,
    private _router:Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  validateNewUser():boolean {

    if(this.newUser.firstName.length === 0 || this.newUser.lastName.length === 0){
      this.errorMessages.fNameError = "First Name and Last Name must not be empty"
      console.log(this.errorMessages.fNameError)
      return false;
    }
    if(this.newUser.lastName.length === 0){
      this.errorMessages.lNameError = "First Name and Last Name must not be empty"
      console.log(this.errorMessages.lNameError)
      return false;
    }
    
    if(!validateEmail(this.newUser.email)){
      this.errorMessages.emailError = "Invalid email!";
      console.log(this.errorMessages.emailError)
      return false;
    }
    
    if(!validatePass(this.newUser.password)) {
    this.errorMessages.passError = "Invalid password, your password must be at least 8 characters long and have Uppercase and Lowecase letters, besides special characters ('!#$%&') and Numbers(0-9)"
      console.log(this.errorMessages.passError)
      return false
    }
    
    if(this.newUser.password != this.newUser.passwordConfirmation){
      this.errorMessages.passConfError ="Your passwords do not match"
      console.log(this.errorMessages.passConfError)
      return false;
    }
    
    return true
  }

  createNewUser(){
    if(this.validateNewUser()){
      
      this._usersService.createAndReturnUser(this.newUser)
        .subscribe(
          (data:UserResponse) =>{
            // console.log(data.userDB)
            const {firstName, lastName, email, _id} = data.userDB
            const user = { firstName, lastName, email, _id}
            this._usersService.loggedInUser = user
            localStorage.setItem("user", JSON.stringify(user) )
            this._router.navigate( ['browse'] );
          },
          error => this.errorMessages.emailError = error.statusText
        )
    }
  }
  
  
}
