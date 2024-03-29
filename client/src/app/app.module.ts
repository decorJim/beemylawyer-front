import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MomentModule } from 'ngx-moment';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { MaterialModules } from './app-material.module';
import { AppComponent } from './components/app/app.component';


import { ErrorMessageComponent } from './components/error-message/error-message.component';

import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AppRoutingModule } from './components/app-routing.module';

import { NewAccountComponent } from './components/new-account/new-account.component';


import { ProfilComponent } from './components/profil/profil.component';

import { LogoutComponent } from './components/logout/logout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditProfilComponent } from './components/editProfil/editProfil.component';
import { RequestComponent } from './components/request/request.component';
import { NewRequestComponent } from './components/new-request/new-request.component';
import { MyRequestDetailsComponent } from './components/my-request-details/my-request-details.component';





@NgModule({
    declarations: [
        AppComponent,  // add component that can use angular material declared below here
        ErrorMessageComponent,
        AlertMessageComponent,
        MainPageComponent,
        NewAccountComponent,
        ProfilComponent,
        LogoutComponent,
        EditProfilComponent,
        RequestComponent,
        NewRequestComponent,
        MyRequestDetailsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModules,
        FontAwesomeModule,
        MomentModule,
        MatDialogModule,
        MatButtonToggleModule,
        AppRoutingModule,
        MatFormFieldModule,
    ],
    exports: [],
    providers: [
        FileReader,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
