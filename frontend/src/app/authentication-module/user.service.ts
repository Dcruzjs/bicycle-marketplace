import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggedInUser, logInUser, newUser, UserResponse } from './interfaces/User.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = "http://localhost:8181"

  loggedInUser : LoggedInUser = {
    _id:"",
    email:"",
    firstName:"",
    lastName:""
  }

  constructor(private _http: HttpClient) { }

  createAndReturnUser( newUser: newUser ):Observable<UserResponse> {
    return  this._http.post<UserResponse>( `${this.URL}/users/create-user`, newUser );
  }

  loginUser( user:logInUser ):Observable<UserResponse>{
  // loginUser( user:logInUser ):void{
    // console.log( user );
    return  this._http.post<UserResponse>( `${this.URL}/users/login`, user );
    // this._http.post<UserResponse>( `${this.URL}/users/login`, user )
      // .subscribe( (resp: UserResponse) => {
      //   const { _id, email, firstName, lastName } =resp.userDB
      //   this.loggedInUser._id = _id
      //   this.loggedInUser.email = email
      //   this.loggedInUser.firstName = firstName
      //   this.loggedInUser.lastName = lastName
      // })
  }

  validateUser(id:string): any {
    return this._http.get( `${this.URL}/users/validate-user/${id}` );
  }

  logoutUser(): any {
    this.loggedInUser = {
      _id:"",
      email:"",
      firstName:"",
      lastName:""
    }

    return this._http.get( `${this.URL}/users/logout` );
  }

  
}
