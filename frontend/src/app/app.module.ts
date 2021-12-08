import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './authentication-module/authentication.module';
import { BicycleModule } from './bicycle-module/bicycle.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserService } from './authentication-module/user.service';
import { MainPageComponent } from './bicycle-module/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthenticationModule,
    BicycleModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
appComponent
  mainPageComponent 
    LogIn/SignUp - New - List - LogOut
      <router-outlet></router-outlet>
       list
          bicycle
            delete(updateList)="loadAll()" edit
*/

/*
appComponent
  AuthPage - List
  <router-outlet></router-outlet>
    AuthPage - List
              new - browse - logOut
              <router-outlet></router-outlet>

*/