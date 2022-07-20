import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SocketService } from '@app/services/socket/oldsocket';
import { URL } from '../../../../constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { French, English} from '@app/interfaces/Langues';
import { UserService } from '@app/services/user.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit {

  private readonly BASE_URL: string = URL;
  public qui: string;
  public cancel: string;
  public leave: string;
  public logout: string;

  constructor(
    public dialogRef: MatDialogRef<LogoutComponent>,
    private socketService: SocketService,
    private http: HttpClient,
    private userService:UserService
  ) { }

  ngOnInit() {
    if (this.socketService.language == "french") {
      this.qui = French.quit;
      this.cancel = French.cancel;
      this.leave = French.leave;
      this.logout = French.logout;
    }
    else {
      this.qui = English.quit;
      this.cancel = English.cancel;
      this.leave = English.leave;
      this.logout = English.logout;
    }
  }

  playAudio(title: string) {
    if (this.socketService.mute == false) {
      let audio = new Audio();
      audio.src = "../../../assets/" + title;
      audio.load();
      audio.play();
    }
  }

  annuler() {
    this.dialogRef.close();
    this.playAudio("ui2.wav");
  }

  quit() {
    let link = this.BASE_URL + "account/logout";
    this.http.post<any>(link,{ useremail:this.userService.getUseremail()  }).subscribe((data: any) => {
      if (data.message == "SUCCESS") {
        this.dialogRef.close();
      }   
    },(error:HttpErrorResponse)=>{
      console.error(error);
      console.log(error.status);
      console.log(error.error.message);
      if(error.error.message=="FAILED") {
        console.log("WRONG PASSWORD");
        return;
      }
    })
  };
}
