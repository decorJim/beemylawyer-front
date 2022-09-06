import { Injectable } from '@angular/core';
import { UserService } from './user.service';

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { ProfilService } from './profil.service';
import { Client } from 'stompjs';
import { URL } from '../../../constants';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket:WebSocket;
  client:Client;
  BASE_URL:string=URL;

  constructor(
    public userService:UserService,
    public profilService:ProfilService
    ) {

  }

  public openConnection():void {
    /** use ws in link to tell that it's for socket connection **/
    let socketURL=this.BASE_URL.concat(`websocket`)
    this.socket = new SockJS(socketURL);
    this.client=Stomp.over(this.socket);
  };

  getStompClient():Client {
    return this.client;
  }

  public closeConnection() {
    this.client.disconnect(()=>{
      console.log("disconnected");
    });
  }

/*
  public sendMessage() {
    this.client.send("/app/profil",{},JSON.stringify(this.userService.getProfil()));
  }

  public sendRan() {
    this.client.send("/app/random",{},"213");
  }

}*/

}