import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { URL } from '../../../../constants';
import { English } from '@app/interfaces/Langues';
import { SocketService } from '@app/services/socket/oldsocket';
import { RouterOutlet } from '@angular/router';
import { fader } from '@assets/animations';
import { LightGrey, DarkGrey, DeepPurple, LightBlue, LightPink } from '@app/interfaces/Themes';




@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  animations: [fader],
})

export class NewAccountComponent implements OnInit {

  @ViewChild('avatar1') avatar1: HTMLElement;

  private readonly BASE_URL: string = URL;

  public error1: string
  public error5: string;
  public error6: string;
  public error7: string;

  pass: string;
  passRepeat: string;
  mail: string;
  fname: string;
  lname:string;
  phoneNumber:String;


  constructor(
    private socketService: SocketService,
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
  ) {

   }

  ngOnInit() {
   
    document.getElementById("avatarDE")!.style.backgroundImage = "url(../../../assets/avdefault.png)";
 

    this.error1 = English.error1;
    this.error5 = English.error5;
    this.error6 = English.error6;
    this.error7 = English.error7;
  
    if(this.socketService.theme == "light grey"){
      document.getElementById("buttonMain6")!.style.backgroundColor = LightGrey.main;
      document.getElementById("buttonMain6")!.style.color = LightGrey.text;
      document.getElementById("title2")!.style.backgroundColor = LightGrey.main;
      document.getElementById("title2")!.style.color = LightGrey.text;
    }
    else if(this.socketService.theme == "dark grey"){
      document.getElementById("buttonMain6")!.style.backgroundColor = DarkGrey.main;
      document.getElementById("buttonMain6")!.style.color = DarkGrey.text;
      document.getElementById("title2")!.style.backgroundColor = DarkGrey.main;
      document.getElementById("title2")!.style.color = DarkGrey.text;
    }
    else if(this.socketService.theme == "deep purple") {      
      document.getElementById("buttonMain6")!.style.backgroundColor = DeepPurple.main;
      document.getElementById("buttonMain6")!.style.color = DeepPurple.text;
      document.getElementById("title2")!.style.backgroundColor = DeepPurple.main;
      document.getElementById("title2")!.style.color = DeepPurple.text;
    }
    else if(this.socketService.theme == "light blue") {
      document.getElementById("buttonMain6")!.style.backgroundColor = LightBlue.main;
      document.getElementById("buttonMain6")!.style.color = LightBlue.text;
      document.getElementById("title2")!.style.backgroundColor = LightBlue.main;
      document.getElementById("title2")!.style.color = LightBlue.text;
    }
    else if(this.socketService.theme == "light pink") {
      document.getElementById("buttonMain6")!.style.backgroundColor = LightPink.main;
      document.getElementById("buttonMain6")!.style.color = LightPink.text;
      document.getElementById("title2")!.style.backgroundColor = LightPink.main;
      document.getElementById("title2")!.style.color = LightPink.text;
    }
  }



  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  image(element: any) {
    this.socketService.avatarNumber = element.textContent.trim();
    this.playAudio("ui2.wav");
  }

  closeClick(): boolean {
    if (this.passRepeat == "" || this.passRepeat == null ||
        this.pass == "" || this.pass == null ||
        this.fname == "" || this.fname == null ||
        this.mail == "" || this.mail == null) {

      document.getElementById("error")!.style.visibility= "visible";
      document.getElementById("error")!.innerHTML = this.error1;
      this.playAudio("error.wav");
      let erreur= document.getElementById("buttonMain6")!;
      erreur.className = "erreuAnimation";
      erreur.classList.remove("erreuAnimation");
      void erreur.offsetWidth;
      erreur.className = "erreuAnimation";
      return false;
    }
    else if (this.pass != this.passRepeat) {
      document.getElementById("error")!.style.visibility= "visible";
      document.getElementById("error")!.innerHTML = this.error5;
      this.playAudio("error.wav");
      let erreur= document.getElementById("buttonMain6")!;
      erreur.className = "erreuAnimation";
      erreur.classList.remove("erreuAnimation");
      void erreur.offsetWidth;
      erreur.className = "erreuAnimation";
      return false;
    }

    else {
      let link=this.BASE_URL+"account/createAccount";
      const account={
        useremail:this.mail,
        password:this.pass,
        fname:this.fname,
        lname:this.lname,
        phonenumber:this.phoneNumber
      }
      this.http.post<any>(link,account).subscribe((data:any)=>{
         console.log(data);
         this.router.navigate([""]);
      },
      (error:HttpErrorResponse)=>{
        if(error.status==408) {
          alert("email already taken");
        }
      }
      );

      return true;
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

  cancelClick(): void {
    this.router.navigate([""]);
    this.playAudio("ui2.wav");
  }

  showAvatar() {
    if(this.socketService.avatarNumber == "1") {
      document.getElementById("avatarDE")!.style.backgroundImage = "url(../../../assets/av1.png)";
    }
    else if(this.socketService.avatarNumber == "2") {
      document.getElementById("avatarDE")!.style.backgroundImage = "url(../../../assets/av2.png)";
    }
    else if(this.socketService.avatarNumber == "3") {
      document.getElementById("avatarDE")!.style.backgroundImage = "url(../../../assets/av3.png)";
    }
    else if(this.socketService.avatarNumber == "4") {
      document.getElementById("avatarDE")!.style.backgroundImage = "url(../../../assets/av4.png)";
    }
    else if(this.socketService.avatarNumber == "5") {
      document.getElementById("avatarDE")!.style.backgroundImage = "url(../../../assets/av5.png)";
    }
  }

  sleep(ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async openAvatar(): Promise<void> {
    this.playAudio("ui2.wav");

    await this.sleep(2000);
    this.showAvatar();
  }



}
