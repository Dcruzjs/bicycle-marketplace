import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { EditComponent } from './edit/edit.component';
import { AuthPageComponent } from '../authentication-module/auth-page/auth-page.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';


const routes: Routes = [
  { 
    path: 'login', 
    component: AuthPageComponent 
  },
  { 
    path: 'browse',
    component: ListComponent,
    children:[
      {
        path: 'bicycle/:id',
        component: EditComponent
      }
    ]
  },
  { 
    path: 'new',
    component: CreateComponent, 
    
  },
  
  // the ** will catch anything that did not match any of the above routes
  {
    path: '**', 
    redirectTo: 'browse' 
  }
];



@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
