import { Injectable } from '@angular/core';
import { UserService } from './user.service';

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  webSocket:WebSocket;
  stompClient: any;
  client: Stomp.Client;

  constructor(public userService:UserService) {

  }

  public openConnection() {

    /** use ws in link to tell that it's for socket connection **/
    let socket = new SockJS(`http://localhost:8080/websocket`);
    this.client=Stomp.over(socket);

  };


  public sendMessage() {
    console.log("sent");
    this.client.send("/app/profil",{},JSON.stringify(this.userService.getProfil()));
  }

  public sendRan() {
    this.client.send("/app/random",{},"213");
  }

  public closeConnection() {
    this.webSocket.close();
  }

  public init() {
    this.openConnection();
    this.client.connect({},(frame)=>{
      // at least one subscribe must be in the initial connection for socket to work
      this.client.subscribe("/lawyers/public",(data)=>{
        console.log(data);
      });
    });
  }

}
