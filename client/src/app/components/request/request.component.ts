import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profil } from '@app/classes/Profil';
import { ProfilInterface } from '@app/interfaces/ProfilInterface';
import { ProfilService } from '@app/services/profil.service';
import { SocketService } from '@app/services/socket.service';
import { UserService } from '@app/services/user.service';
import { Message } from 'stompjs';
import { URL } from '../../../../constants';


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
    public profilService:ProfilService
    ) { }

  BASE_URL:String=URL;
  profils:Profil[]=[];

  ngOnInit() {
    this.webSocketService.openConnection();

    this.webSocketService.getStompClient().connect({},(frame)=>{
      this.manageNewProfils();
      this.manageEditedProfil();
    })
  

    let link:string=URL+"user/profil/all";
    this.http.get(link).subscribe((data:any)=>{
      data.forEach((profil:ProfilInterface)=>{
        let profilObj:Profil=new Profil(profil);
        this.userService.users.set(profilObj.getId(),profilObj);
        this.profilService.updateProfils();
      });
    });
  }

  signin() {
    this.router.navigate(['/','signin']);
  }

  send() {
    this.webSocketService.getStompClient().send("/app/random",{},"213");
  }

  manageNewProfils() {
    this.webSocketService.getStompClient().subscribe("/lawyers/public",(data:Message)=>{
      let profilInterface:ProfilInterface=JSON.parse(data.body);
      let profil:Profil=new Profil(profilInterface);
      this.userService.users.set(profil.getId(),profil);
      this.profilService.updateProfils();
    });
  }

  manageEditedProfil() {
    this.webSocketService.getStompClient().subscribe("/lawyers/editedProfil",(data:Message)=>{
      let profilInterface:ProfilInterface=JSON.parse(data.body);
      let profil:Profil=new Profil(profilInterface); 
      this.userService.users.set(profil.getId(),profil);
    });
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

}
