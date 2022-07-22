import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL } from '../../../../constants';
import { French, English} from '@app/interfaces/Langues';
import { MatDialog } from '@angular/material/dialog';
import { LightGrey, DarkGrey, DeepPurple, LightBlue, LightPink } from '@app/interfaces/Themes';
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
    this.webSocketService.client.connect({},(frame)=>{
      // at least one subscribe must be in the initial connection for socket to work
      this.webSocketService.client.subscribe("/lawyers/public",(data)=>{
        console.log(data);
      });
    });
    this.ref.detectChanges();
    if(this.socketService.language == "french") 
    {
      this.options = French.options;
      this.error1 = French.error1;
      this.error2 = French.error2;
      this.error3 = French.error3;
      this.error4 = French.error4;
    }
    else {
      this.options = English.options;
      this.error1 = English.error1;
      this.error2 = English.error2;
      this.error3 = English.error3;
      this.error4 = English.error4;
    }

    if(this.socketService.theme == "light grey"){
      document.getElementById("buttonMain")!.style.backgroundColor = LightGrey.main;
      document.getElementById("buttonMain")!.style.color = LightGrey.text;
      document.getElementById("buttonMain2")!.style.backgroundColor = LightGrey.main;
      document.getElementById("buttonMain2")!.style.color = LightGrey.text;
      document.getElementById("requestButton")!.style.backgroundColor = LightGrey.main;
      document.getElementById("requestButton")!.style.color = LightGrey.text;
      document.getElementById("title01")!.style.backgroundColor = LightGrey.main;
      document.getElementById("title01")!.style.color = LightGrey.text;
    }
    else if(this.socketService.theme == "dark grey"){
      document.getElementById("buttonMain")!.style.backgroundColor = DarkGrey.main;
      document.getElementById("buttonMain")!.style.color = DarkGrey.text;
      document.getElementById("buttonMain2")!.style.backgroundColor = DarkGrey.main;
      document.getElementById("buttonMain2")!.style.color = DarkGrey.text;
      document.getElementById("buttonMain3")!.style.backgroundColor = DarkGrey.main;
      document.getElementById("buttonMain3")!.style.color = DarkGrey.text;
      document.getElementById("title01")!.style.backgroundColor = DarkGrey.main;
      document.getElementById("title01")!.style.color = DarkGrey.text;
    }
    else if(this.socketService.theme == "deep purple") {       
      document.getElementById("buttonMain")!.style.backgroundColor = DeepPurple.main;
      document.getElementById("buttonMain")!.style.color = DeepPurple.text;
      document.getElementById("buttonMain2")!.style.backgroundColor = DeepPurple.main;
      document.getElementById("buttonMain2")!.style.color = DeepPurple.text;
      document.getElementById("buttonMain3")!.style.backgroundColor = DeepPurple.main;
      document.getElementById("buttonMain3")!.style.color = DeepPurple.text;
      document.getElementById("title01")!.style.backgroundColor = DeepPurple.main;
      document.getElementById("title01")!.style.color = DeepPurple.text;
    }
    else if(this.socketService.theme == "light blue") { 
      document.getElementById("buttonMain")!.style.backgroundColor = LightBlue.main;
      document.getElementById("buttonMain")!.style.color = LightBlue.text;
      document.getElementById("buttonMain2")!.style.backgroundColor = LightBlue.main;
      document.getElementById("buttonMain2")!.style.color = LightBlue.text;
      document.getElementById("buttonMain3")!.style.backgroundColor = LightBlue.main;
      document.getElementById("buttonMain3")!.style.color = LightBlue.text;
      document.getElementById("title01")!.style.backgroundColor = LightBlue.main;
      document.getElementById("title01")!.style.color = LightBlue.text;
    }
    else if(this.socketService.theme == "light pink") {  
      document.getElementById("buttonMain")!.style.backgroundColor = LightPink.main;
      document.getElementById("buttonMain")!.style.color = LightPink.text;
      document.getElementById("buttonMain2")!.style.backgroundColor = LightPink.main;
      document.getElementById("buttonMain2")!.style.color = LightPink.text;
      document.getElementById("buttonMain3")!.style.backgroundColor = LightPink.main;
      document.getElementById("buttonMain3")!.style.color = LightPink.text;
      document.getElementById("title01")!.style.backgroundColor = LightPink.main;
      document.getElementById("title01")!.style.color = LightPink.text;
    }
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
