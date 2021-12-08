import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedInUser } from 'src/app/authentication-module/interfaces/User.interface';
import { UserService } from 'src/app/authentication-module/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {

  // @Input() loggedInUser: LoggedInUser ={
  //   _id: "",
  //   email: "",
  //   firstName: "",
  //   lastName: "",
  // }
  
  loggedInUser: LoggedInUser ={
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
  }

  @Output() loggedInUserEvent = new EventEmitter<boolean>();

  loggedInUserFunct() {
    this.loggedInUserEvent.emit(true);
  }
    constructor(
    private _usersService: UserService, 
    private _router:Router,
    private _route:ActivatedRoute
  ){}
  
  ngOnInit(){
    if(this._usersService.loggedInUser){
      this.loggedInUser = this._usersService.loggedInUser
      this.loggedInUserFunct()

    }
  }

  logout(): void {
    
    this._usersService.logoutUser()
      .subscribe( (data: any) => {
      console.log( data );
      localStorage.removeItem("user")
      this._router.navigate( ['login'] );
      
    });
  }

  validateSession(){
    this.loggedInUser = this._usersService.loggedInUser
  }

}
