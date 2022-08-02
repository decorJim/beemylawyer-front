import { Injectable } from '@angular/core';
import { UserService } from './user.service';

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { ProfilService } from './profil.service';
import { Client } from 'stompjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  webSocket:WebSocket;
  client:Client;

  constructor(
    public userService:UserService,
    public profilService:ProfilService
    ) {

  }

  public openConnection():void {
    /** use ws in link to tell that it's for socket connection **/
    let socket = new SockJS(`http://localhost:8080/websocket`);
    this.client=Stomp.over(socket);
  };

  getStompClient():Client {
    return this.client;
  }

/*
  public sendMessage() {
    this.client.send("/app/profil",{},JSON.stringify(this.userService.getProfil()));
  }

  public sendRan() {
    this.client.send("/app/random",{},"213");
  }

  public closeConnection() {
    this.client.disconnect(()=>{
      console.log("disconnected");
    });
  }

 manageNewProfils() {
  this.client.subscribe("/lawyers/public",(data:Stomp.Message)=>{
    let profilInterface:ProfilInterface=JSON.parse(data.body);
    let profil:Profil=new Profil(profilInterface);
    this.userService.users.set(profil.getId(),profil);
    this.profilService.updateProfils();
  });
 }

 manageEditedProfil() {
  this.client.subscribe("/lawyers/editedProfil",(data:Stomp.Message)=>{
    let profilInterface:ProfilInterface=JSON.parse(data.body);
    let profil:Profil=new Profil(profilInterface); 
    this.userService.users.set(profil.getId(),profil);
  });
}*/

}