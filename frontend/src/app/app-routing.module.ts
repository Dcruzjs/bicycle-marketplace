import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './authentication-module/auth-page/auth-page.component';
import { CreateComponent } from './bicycle-module/create/create.component';
import { EditComponent } from './bicycle-module/edit/edit.component';
import { ListComponent } from './bicycle-module/list/list.component';
import { MainPageComponent } from './bicycle-module/main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch:"full",
    component: ListComponent
  },
  { 
    path: 'auth-page', 
    component: AuthPageComponent 
  },
  { 
    path: 'main',
    component: MainPageComponent,
    children:[
      {
        path: 'bicycle/:id',
        component: EditComponent
      },
      { 
        path: 'new',
        component: CreateComponent, 
        
      },
      { 
        path: 'list',
        component: ListComponent, 
        
      },
    ]
  },
  
  // the ** will catch anything that did not match any of the above routes
  {
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
