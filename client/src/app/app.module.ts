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
import { ParameterMenuComponent } from './components/parameter-menu/parameter-menu.component';
import { ParameterDirective } from './components/parameter-menu/parameter.directive';

import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AppRoutingModule } from './components/app-routing.module';

import { NewAccountComponent } from './components/new-account/new-account.component';

import { SettingsComponent } from './components/settings/settings.component';

import { AcceptRequestComponent } from './components/accept-request/accept-request.component';
import { ProfilComponent } from './components/profil/profil.component';
import { UsersComponent } from './components/users/users.component';

import { EnterPasswordComponent } from './components/enter-password/enter-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditProfilComponent } from './components/editProfil/editProfil.component';





@NgModule({
    declarations: [
        AppComponent,  // add component that can use angular material declared below here
        ParameterMenuComponent,
        WorkspaceComponent,
        ParameterMenuComponent,
        WorkspaceComponent,
        ParameterDirective,
        ErrorMessageComponent,
        AlertMessageComponent,
        MainPageComponent,
        NewAccountComponent,
        SettingsComponent,
        AcceptRequestComponent,
        ProfilComponent,
        UsersComponent,
        EnterPasswordComponent,
        LogoutComponent,
        EditProfilComponent,
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
