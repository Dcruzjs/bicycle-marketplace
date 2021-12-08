import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BicycleComponent } from './bicycle/bicycle.component';
import { ListComponent } from "./list/list.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { RoutingModule } from './routing.module';
import { BicycleService } from './bicycle.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../authentication-module/user.service';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [
    BicycleComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    MainPageComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    RouterModule
    
  ],
  exports:[
    MainPageComponent,
    NavComponent
  ],
  providers:[
    BicycleService,
    UserService
  ]
})
export class BicycleModule { }
