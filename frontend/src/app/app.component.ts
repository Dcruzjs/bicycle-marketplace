import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedInUser } from './authentication-module/interfaces/User.interface';
import { UserService } from './authentication-module/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loggedInUser: boolean = false

    constructor(
    private _usersService: UserService, 
    private _router:Router,
    private _route:ActivatedRoute
  ){}
  
  ngOnInit(){
  
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
    console.log("LOGGED IN USER EVENT", this._usersService.loggedInUser)
    this.loggedInUser = true

  }


}
