import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './components/app-routing.module';

import { RequestComponent } from './components/RequestComponent/request.component';
import { NewRequestComponent } from './components/new-request/new-request.component';
import { ProfilComponent } from './components/profil/profil.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { EditProfilComponent } from './components/editProfil/editProfil.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MyRequestDetailsComponent } from './components/my-request-details/my-request-details.component';
import { AppComponent } from './components/app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RequestComponent,
    NewRequestComponent,
    ProfilComponent,
    NewAccountComponent,
    EditProfilComponent,
    LogoutComponent,
    MyRequestDetailsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatGridListModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule, // added 
    ReactiveFormsModule, // added
    MatDialogModule, // added
    MatInputModule
  ],
  providers: [
    FileReader,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
