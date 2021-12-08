import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedInUser } from 'src/app/authentication-module/interfaces/User.interface';
import { UserService } from 'src/app/authentication-module/user.service';
import { BicycleService } from '../bicycle.service';
import { Bicycle, BicycleDB } from '../interfaces/Bicycle.interface';

@Component({
  selector: 'app-bicycle',
  templateUrl: './bicycle.component.html',
})
export class BicycleComponent implements OnInit {

  @Input() bicycle: BicycleDB = {
    _id:"",
    title: "",
    description: "",
    location: "",
    ownerId:"",
    ownerEmail:"",
    ownerName:"",
    price:0,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v:0
  }

  loggedInUser: LoggedInUser = {
    _id: "",
  email: "",
  firstName: "",
  lastName: "",
  }

  @Output() updateListEvent = new EventEmitter<boolean>();

  updateList() {
    this.updateListEvent.emit(true);
  }

  constructor(
      private _bicycleService:BicycleService,
      private _userService:UserService,
      private _router:Router,
      private _route:ActivatedRoute
    ) { }
    
  ngOnInit(): void {
    if(this._userService.loggedInUser._id.length > 0){
      this.loggedInUser = this._userService.loggedInUser
    }
  }

  delete($event:any){
    console.log($event.target.id)
    this._bicycleService.delete($event.target.id)
      .subscribe((data:any) => {
        console.log(data)
        this.updateList()
        this._router.navigate(["getall"])
      })
  }

  validateSession(){
    this._userService.validateUser(this._userService.loggedInUser._id)
      .subscribe( (resp:any) => console.log(resp))
  }



}
