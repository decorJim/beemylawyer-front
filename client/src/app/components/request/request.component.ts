import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profil } from '@app/classes/Profil';
import { ProfilInterface } from '@app/interfaces/ProfilInterface';
import { SocketService } from '@app/services/socket.service';
import { UserService } from '@app/services/user.service';
import { URL } from '../../../../constants';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  constructor( public webSocketService:SocketService, private router: Router, public userService:UserService, public http:HttpClient) { }

  BASE_URL:String=URL;
  profils:Profil[]=[];

  ngOnInit() {
    this.webSocketService.openConnection();
    this.webSocketService.client.connect({},(frame)=>{
      // at least one subscribe must be in the initial connection for socket to work
      this.webSocketService.client.subscribe("/lawyers/public",(data)=>{
        console.log(data);
      });
    });

    let link:string=URL+"user/profil/all";
    this.http.get(link).subscribe((data:any)=>{
      data.forEach((profil:ProfilInterface)=>{
        let profilObj:Profil=new Profil(profil);
        this.userService.users.set(profilObj.getId(),profilObj);
        this.updateProfils();
      });
    });
    console.info("la map",this.userService.users);
  }


  updateProfils():void {
    this.profils=[];
    this.userService.users.forEach((v,k)=>{
       this.profils.push(v);
    });
    console.table(this.profils);
  }


  signin() {
    this.router.navigate(['/','signin']);
  }

  send() {
    this.webSocketService.sendRan();
  }

}
