import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { URL } from '../../../../constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { English} from '@app/interfaces/Langues';
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
    private http: HttpClient,
    private userService:UserService
  ) { }

  ngOnInit() {

      this.qui = English.quit;
      this.cancel = English.cancel;
      this.leave = English.leave;
      this.logout = English.logout;
  
  }


  annuler() {
    this.dialogRef.close();
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
