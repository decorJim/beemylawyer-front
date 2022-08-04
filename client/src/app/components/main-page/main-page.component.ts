import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL } from '../../../../constants';
import { English} from '@app/interfaces/Langues';
import { MatDialog } from '@angular/material/dialog';
import { LightGrey} from '@app/interfaces/Themes';
import { RouterOutlet } from '@angular/router';
import { fader } from '@assets/animations';
import { UserService } from '@app/services/user.service';
import { ProfilInterface } from '@app/interfaces/ProfilInterface';
import { Profil } from '@app/classes/Profil';
import { OldSocketService } from '@app/services/socket/oldsocket';
import { SocketService } from '@app/services/socket.service';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'], 
  animations: [fader],
})

export class MainPageComponent implements OnInit{

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
    private socketService: OldSocketService,
    private http: HttpClient,
    private router: Router,
    private ref:ChangeDetectorRef,
    private userService:UserService,
    public webSocketService:SocketService
  ) { 
   
  }

  ngOnInit(): void {
    this.webSocketService.openConnection();
    this.ref.detectChanges();

      this.options = English.options;
      this.error1 = English.error1;
      this.error2 = English.error2;
      this.error3 = English.error3;
      this.error4 = English.error4;

      document.getElementById("buttonMain")!.style.backgroundColor = LightGrey.main;
      document.getElementById("buttonMain")!.style.color = LightGrey.text;
      document.getElementById("buttonMain2")!.style.backgroundColor = LightGrey.main;
      document.getElementById("buttonMain2")!.style.color = LightGrey.text;
      document.getElementById("requestButton")!.style.backgroundColor = LightGrey.main;
      document.getElementById("requestButton")!.style.color = LightGrey.text;
      document.getElementById("title01")!.style.backgroundColor = LightGrey.main;
      document.getElementById("title01")!.style.color = LightGrey.text;
    
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
            console.log(data);
            let profil:Profil=new Profil(data);
            this.userService.setProfil(profil);
            this.userService.setUseremail(this.email);

            this.userService.display=true;
            this.userService.setProfilToDisplay(this.userService.getProfil());
            
            this.webSocketService.getStompClient().subscribe("/lawyers/randomDes",(data:any)=>{
              console.log("msg",data);
            });
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


  playAudio(title: string){
    if (this.socketService.mute == false) {
      let audio = new Audio();
      audio.src = "../../../assets/" + title;
      audio.load();
      audio.play();
    }
  }
  

  openSettings(): void {
    this.router.navigate(['/', 'settings']);
  }

  registerClick(): void {
    this.router.navigate(['/', 'register']);
  }

  avatar():void {
    this.router.navigate(['/','avatar']);
  }

  requestPage():void {
    console.log("request page")
    this.router.navigate(['/','request']);
  }
}
