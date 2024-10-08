/*
 *
 *
 component where clients can view every lawyer, view their profil and add requests
 * 
 * 
 */

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router';
import { Profil } from '../../classes/Profil';
import { ProfilInterface } from '../../interfaces/ProfilInterface';
import { ProfilService } from '../../services/profil.service';
import { SocketService } from '../../services/socket.service';
import { UserService } from '../../services/user.service';
import { URL } from '../../constants/constants';
import { NewRequestComponent } from '../new-request/new-request.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  constructor( 
    public webSocketService:SocketService, 
    private router: Router, 
    public userService:UserService, 
    public http:HttpClient,
    public profilService:ProfilService,
    public dialog: MatDialog,
    ) { }

  BASE_URL:String = URL;
  profils:Profil[] = [];

  ngOnInit() {
    const client = this.webSocketService.getStompClient();

    // Use onConnect to ensure the client is connected before subscribing
    client.onConnect = (frame) => {
      console.log('WebSocket connected:', frame);
  
      // Now you can safely call your subscription methods
      this.manageNewProfils();
      this.manageEditedProfil();
    };
  
    client.onStompError = (frame) => {
      console.error('STOMP Error:', frame.headers['message']);
    };

    let link:string=URL+"user/profil/all";
    this.http.get(link).subscribe(  (data:any)  =>  {
      data.forEach( (profil:ProfilInterface)  =>  {
        
        let profilObj:Profil=new Profil(profil);
        this.userService.users.set(profilObj.getId(),profilObj);
        
        let profils = this.userService.getProfils();
        this.profilService.updateProfils(profils);
        
      });
    });
  }

  signin() {
    this.webSocketService.closeConnection();
    this.router.navigate(['/','signin']);
  }

  send() {
    if (this.webSocketService.getStompClient() && this.webSocketService.getStompClient().connected) {
      this.webSocketService.getStompClient().publish(
        {
          destination: "/app/random",
          body: "213"
        }
      );
    } else {
      console.error('STOMP client is not connected. Cannot send message.');
    }
  }

  manageNewProfils() {
    const client = this.webSocketService.getStompClient()

    if (client && client.connected) {
      client.subscribe("/lawyers/public", (message) => {
        let profilInterface:ProfilInterface=JSON.parse(message.body);
        let profil:Profil=new Profil(profilInterface);
        this.userService.users.set(profil.getId(),profil);

        let profils = this.userService.getProfils();
        this.profilService.updateProfils(profils);
      })
    } else {
      console.error('STOMP client is not connected. Cannot subscribe.');
    }
  }

  manageEditedProfil() {

    const client = this.webSocketService.getStompClient()

    if (client && client.connected) {
      client.subscribe("/lawyers/editedProfil", (message) => {
        let profilInterface:ProfilInterface=JSON.parse(message.body);
        let profil:Profil=new Profil(profilInterface); 
        this.userService.users.set(profil.getId(),profil);
        if(profil.getId()==this.userService.getProfilToDisplay().getId()) {
        this.userService.setProfilToDisplay(profil);
      }
      })
    }
  }

  toProfil(profilId:String) {
    let link:string=this.BASE_URL.concat(`user/profil/id/`+`${profilId}`);
    this.http.get(link).subscribe((data)=>{
      console.log(data);
      let profil:Profil=new Profil(data as ProfilInterface);
      this.userService.display=false;
      this.userService.setProfilToDisplay(profil);
      this.router.navigate(["/","profil"])
    })
  }

  openNewRequest(lawyerId:String) {
    
    NewRequestComponent.lawyerId=lawyerId;
    this.dialog.open(NewRequestComponent,{
      height: '60%',
      width: '30%'
    });
  }

}
