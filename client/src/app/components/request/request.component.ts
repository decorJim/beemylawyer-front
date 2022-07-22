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
    this.webSocketService.openConnection();
    this.webSocketService.client.connect({},(frame)=>{
      // at least one subscribe must be in the initial connection for socket to work
      this.webSocketService.client.subscribe("/lawyers/public",(data)=>{
        console.log(data);
      });
    });
  }

  signin() {
    this.router.navigate(['/','signin']);
  }

  send() {
    this.webSocketService.sendRan();
  }

}
