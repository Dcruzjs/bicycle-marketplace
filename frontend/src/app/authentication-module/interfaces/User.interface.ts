export interface newUser{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  errorMessages?: errorMsgs;
}

export interface errorMsgs {
  fNameError: string;
  lNameError: string;
  emailError: string;
  passError: string;
  passConfError: string;

}
export interface errorLogInMsgs {
  emailError: string;
  passError: string;

}

export interface logInUser{
  email: string;
  password:string;
}

export interface UserResponse {
    userDB: UserDB;
}

export interface UserDB {
    _id:       string;
    firstName: string;
    lastName:  string;
    email:     string;
    password:  string;
    polls:     any[];
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

export interface LoggedInUser{
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}