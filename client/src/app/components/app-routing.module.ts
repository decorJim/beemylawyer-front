import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfilComponent } from './editProfil/editProfil.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { ProfilComponent } from './profil/profil.component';
import { RequestComponent } from './request/request.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  {
    path: '', component: MainPageComponent, data: {animation:'isRight'}
  },
  { 
    path: 'main', component: MainPageComponent, data: {animation:'isRight'}
  },

  {
    path: 'register', component: NewAccountComponent, data: {animation:'isRight'}
  },
  {
    path:'settings',component:SettingsComponent
  },
  {
    path:'profil',component:ProfilComponent
  },
  {
    path:'edit-profil',component:EditProfilComponent
  },
  {
    path:'request',component:RequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
