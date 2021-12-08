import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedInUser } from 'src/app/authentication-module/interfaces/User.interface';
import { UserService } from 'src/app/authentication-module/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loggedInUser: LoggedInUser ={
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
  }

  constructor(
    private _usersService: UserService, 
    private _router:Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(this.validateSession()){
      this.loggedInUser = this._usersService.loggedInUser
    }
  }

  logout(): void {
    
    this._usersService.logoutUser()
      .subscribe( (data: any) => {
      console.log( data );
      localStorage.removeItem("user")
      this._router.navigate( ['auth-page'] );
      
    });
  }

  validateSession(){
    return this._usersService.loggedInUser._id.length > 0 ? true : false
  }
}
