import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL } from '../../constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { ProfilInterface } from '../../interfaces/ProfilInterface';
import { Profil } from '../../classes/Profil';
import { English } from '../../interfaces/Langues';

import { SocketService } from '../../services/socket.service';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'], 
})
export class MainPageComponent implements OnInit {

  private readonly BASE_URL: string = URL;

  public options: string;
  public error1: string;
  public error2: string;
  public error3: string;
  public error4: string;

  password: string;
  email: string;
  conditionValid: boolean;


  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private ref:ChangeDetectorRef,
    private userService:UserService,
    public webSocketService:SocketService
  ) { 
  }

  ngOnInit(): void {
    console.log('MainPageComponent initialized!');
    this.webSocketService.openConnection();
    this.ref.detectChanges();

    this.options = English.options;
    this.error1 = English.error1;
    this.error2 = English.error2;
    this.error3 = English.error3;
    this.error4 = English.error4;
    
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  closeClick(): void {
    if (this.email == "" || this.email == null ||
        this.password == "" || this.password == null) {

      document.getElementById("error")!.style.visibility= "visible";
      document.getElementById("error")!.innerHTML = this.error1;
      let erreur= document.getElementById("buttonMain2")!;
      erreur.className = "erreuAnimation";
      erreur.classList.remove("erreuAnimation");
      void erreur.offsetWidth;
      erreur.className = "erreuAnimation";
      return;
    }
    else { 
      let link=this.BASE_URL+"account/login";
    
      this.http.post<any>(link,{useremail:this.email,password:this.password}).subscribe((data: any) => {
        if(data.message=="SUCCESS") {
          let profilLink=this.BASE_URL+"user/profil/"+this.email;
          this.http.get<any>(profilLink).subscribe((data:ProfilInterface)=>{
            let profil:Profil=new Profil(data);
            this.userService.setProfil(profil);
            this.userService.setUseremail(this.email);

            this.userService.display=true;
            this.userService.setProfilToDisplay(this.userService.getProfil());

            const client = this.webSocketService.getStompClient(); // Get the Stomp client
            if (client && client.connected) { // Check if the client is connected
              client.subscribe("/lawyers/randomDes", (message) => {
                console.log("msg",data);
              });
            } else {
              console.error('STOMP client is not connected. Cannot subscribe.');
            }
            this.webSocketService.closeConnection();
            this.router.navigate(['/', 'profil']);
          },
          (error:HttpErrorResponse)=>{
            console.error(error);
            console.log(error.error.message);
          }
          )          
        }
      },
      (error:HttpErrorResponse)=>{
        console.error(error);
        if(error.status==400 && error.error.message=="FAILED") {
          alert("user or password wrong combination");
        } 
        if(error.status==404) {
          alert("user not found");
        }
        console.log("caca");
      }
      );
    }
  }
  

  openSettings(): void {
    this.router.navigate(['/', 'settings']);
  }

  registerClick(): void {
    this.webSocketService.closeConnection();
    this.router.navigate(['/', 'register']);
  }

  avatar():void {
    this.router.navigate(['/','avatar']);
  }

  requestPage():void {
    this.webSocketService.closeConnection();
    this.router.navigate(['/','request']);
  }
}
