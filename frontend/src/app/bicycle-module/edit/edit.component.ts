import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserService } from 'src/app/authentication-module/user.service';
import { Bicycle, BicycleDB, BicycleErrorMsgs, BicycleResponse } from 'src/app/bicycle-module/interfaces/Bicycle.interface';
import { BicycleService } from '../bicycle.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {

  // bicycle:BicycleResponse = {
  //   BicycleDB: {
  //   _id:"",
  //   title:"",
  //   description: "",
  //   location: "",
  //   price:0,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   __v:       0,
  //   }
  // }
  bicycle: BicycleDB = {
  _id:"",
  title:"",
  description: "",
  location: "",
  price:0,
  ownerId:"",
  ownerEmail:"",
  ownerName:"",
  createdAt: new Date(),
  updatedAt: new Date(),
  __v:       0,
}

  errorMsgs: BicycleErrorMsgs ={
    titleError:"",
    descriptionError: "",
    locationError: "",
    priceError:"",
    Error:"",
  }

  @Output() updateListEvent = new EventEmitter<boolean>();
  

  updateList() {
    this.updateListEvent.emit(true);
  }

  constructor(
      private _userService: UserService,
      private _bicycleService: BicycleService,
      private _router:Router,
      private _route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    if(this._userService.loggedInUser._id.length === 0){
      this._router.navigate(["browse"])
    }
    
    this._route.params.pipe( switchMap(
      ({id}) => this._bicycleService.getOne(id)
    ) )
    .subscribe(
      (resp:any) => {
        console.log((resp.resp))
        this.bicycle = resp.resp
      },
      error => this.errorMsgs.Error = error
    )
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

  editBicycle(){
    // console.log(this.validateBicycle())
    if(this.validateBicycle()){
      this._bicycleService.update(this.bicycle._id, this.bicycle).subscribe(
        (resp:BicycleResponse) => {
          this.updateList()
          this._bicycleService.getAllIn()
            .subscribe((resp:any)=>{
              this._bicycleService.bicycles = resp.resp
              console.log(this._bicycleService.bicycles)
              this._router.navigate(["browse"])
            })
        },
        (error:any) => this.errorMsgs.Error = error.statusText
      )
    }
  }

}
