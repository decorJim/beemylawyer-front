import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { URL } from '../../../../constants';
import { English } from '@app/interfaces/Langues';
import { RouterOutlet } from '@angular/router';
import { fader } from '@assets/animations';
import { LightGrey } from '@app/interfaces/Themes';




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
  
    document.getElementById("buttonMain6")!.style.backgroundColor = LightGrey.main;
    document.getElementById("buttonMain6")!.style.color = LightGrey.text;
    document.getElementById("title2")!.style.backgroundColor = LightGrey.main;
    document.getElementById("title2")!.style.color = LightGrey.text;
    
  }



  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  image(element: any) {

  }

  closeClick(): boolean {
    if (this.passRepeat == "" || this.passRepeat == null ||
        this.pass == "" || this.pass == null ||
        this.fname == "" || this.fname == null ||
        this.mail == "" || this.mail == null) {

      document.getElementById("error")!.style.visibility= "visible";
      document.getElementById("error")!.innerHTML = this.error1;
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

  

  cancelClick(): void {
    this.router.navigate([""]);
  }

  showAvatar() {
      document.getElementById("avatarDE")!.style.backgroundImage = "url(../../../assets/av1.png)";
  }

  sleep(ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async openAvatar(): Promise<void> {
    await this.sleep(2000);
    this.showAvatar();
  }



}
