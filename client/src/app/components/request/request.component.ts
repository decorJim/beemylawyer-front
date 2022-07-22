import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '@app/services/socket.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  constructor( public webSocketService:SocketService, private router: Router,) { }

  ngOnInit() {
      this.webSocketService.client.subscribe("/lawyers/randomDes",(data:any)=>{
        console.log("msg",data);
      });
  }

  signin() {
    this.router.navigate(['/','main']);
  }

  send() {
    this.webSocketService.sendRan();
  }

}
