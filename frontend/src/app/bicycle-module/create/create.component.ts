import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/authentication-module/user.service';
import { Bicycle, BicycleErrorMsgs, BicycleResponse } from 'src/app/bicycle-module/interfaces/Bicycle.interface';
import { BicycleService } from '../bicycle.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {

  bicycle: Bicycle = {
    title: "",
    price: 0,
    location: "",
    description: "",
    ownerId: this._userService.loggedInUser._id,
    ownerEmail: this._userService.loggedInUser.email,
    ownerName: this._userService.loggedInUser.firstName,
  }

  errorMsgs: BicycleErrorMsgs ={
    titleError:"",
    descriptionError: "",
    locationError: "",
    priceError:"",
    Error:"",
  }

  constructor(
    private _userService: UserService,
    private _bicycleService: BicycleService ,
    private _router:Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(this._userService.loggedInUser._id.length === 0){
      this._router.navigate(["browse"])
    }
  }

  validateBicycle(){
    if(this.bicycle.title.length === 0){
      this.errorMsgs.titleError = "The title must not be empty."
      console.log(this.errorMsgs.titleError)
      return false;
    }
    
    if(this.bicycle.description.length === 0){
      this.errorMsgs.descriptionError = "Try to impress everyone with an awesome Description. This field must not be empty."
      console.log(this.errorMsgs.descriptionError)
      return false;
    }
    
    if(this.bicycle.location.length === 0){
      this.errorMsgs.locationError = "Try State, Country format, this field must not be empty."
      console.log(this.errorMsgs.locationError)
      return false;
    }
    
    if(this.bicycle.price === 0){
      this.errorMsgs.priceError = "I think you are missing an important part, the price can not be 0."
      console.log(this.errorMsgs.priceError)
      return false;
    }

    this.errorMsgs ={
    titleError:"",
    descriptionError: "",
    locationError: "",
    priceError:"",
    Error:""
  }
    return true;
  }

  createBicycle(){
    console.log(this.validateBicycle())
    if(this.validateBicycle()){
      this._bicycleService.create(this.bicycle)
      .subscribe(
        (resp:BicycleResponse) => this._router.navigate(["browse"]),
        (error:any) => this.errorMsgs.Error = error.statusText
      )
    }
  }

}
