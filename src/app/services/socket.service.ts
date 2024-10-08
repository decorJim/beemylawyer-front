import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import { URL } from '../constants/constants';
import SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root',
})
export class SocketService {

  socket:WebSocket;
  stompClient: Stomp.Client
  BASE_URL:string = URL;

  constructor(
    ) {
    this.openConnection()
  }

  public openConnection():void {

    this.socket = new SockJS(this.BASE_URL.concat(`websocket`));

    this.stompClient = new Stomp.Client({
      brokerURL: undefined, // No broker URL because of SockJS
      webSocketFactory: () => this.socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected', frame);
      console.log("LOG - Websockets successful connection !!")
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ', frame.headers['message']);
      console.error('Additional details: ', frame.body);
    };

    this.stompClient.activate();
  };

  getStompClient():Stomp.Client {
    return this.stompClient;
  }

  public closeConnection() {
    this.stompClient.deactivate(
      {force:true}
    ).finally(()=> {
      console.log("disconnected !!!")
    })
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