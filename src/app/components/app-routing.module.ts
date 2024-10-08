import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestComponent } from './RequestComponent/request.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { ProfilComponent } from './profil/profil.component';
import { EditProfilComponent } from './editProfil/editProfil.component';

const routes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'request', component: RequestComponent,
  },
  { 
    path: 'signin', component: MainPageComponent
  },
  {
    path: 'register', component: NewAccountComponent
  },
  {
    path:'profil',component:ProfilComponent
  },
  {
    path:'edit-profil',component:EditProfilComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
