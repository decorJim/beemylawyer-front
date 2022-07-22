
import { Component, OnInit } from '@angular/core';

//import { URL } from '../../../../constants';

import { LogoutComponent } from '../logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { English } from '@app/interfaces/Langues';
import { UserService } from '../../services/user.service';
import { EditProfilComponent } from '../editProfil/editProfil.component';
import { SocketService } from '@app/services/socket.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  //private readonly BASE_URL: string = URL;

  public avatar: string;
  public useremail: string;
  public nickname: string;
  public lastLoggedIn: string;
  public lastLoggedOut: string;
  public friends: Array<string>;

  profilTitle: string;
  info1: string;
  info2: string;
  info3: string;
  info4: string;
  info5: string;
  remove: string;


  constructor(
    public userService:UserService,
    public dialog: MatDialog,
    public webSocketService:SocketService
  ) { }

  ngOnInit(): void {

    this.profilTitle = English.profilTitle;
    this.info1 = English.info1;
    this.info2 = English.info2;
    this.info3 = English.info3;
    this.info4 = English.info4;
    this.info5 = English.info5;
    this.remove = English.remove;

    
  }

  
  logout() {
    this.dialog.open(LogoutComponent);
  }

  openEditProfil() {
    this.dialog.open(EditProfilComponent,{
      height: '60%',
      width: '43%'
    });
  }

  

}