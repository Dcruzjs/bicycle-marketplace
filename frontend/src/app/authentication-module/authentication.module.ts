import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from '../bicycle-module/nav/nav.component';
import { BicycleModule } from '../bicycle-module/bicycle.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthPageComponent,
    // NavComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    BicycleModule
    // AppRoutingModule
  ],
  exports:[
    AuthPageComponent
  ]
})
export class AuthenticationModule { }
