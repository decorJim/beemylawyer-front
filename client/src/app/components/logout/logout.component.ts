import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { English} from '@app/interfaces/Langues';
import { UserService } from '@app/services/user.service';
import { URL } from '../../../../constants';





@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit {

  public qui: string;
  public cancel: string;
  public leave: string;
  public logout: string;

  public BASE_URL=URL;

  constructor(
    public dialogRef: MatDialogRef<LogoutComponent>,
    public dialogRefAlert:MatDialog,
    public http:HttpClient,
    public router:Router,
    public userService:UserService
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
        this.userService.display=false;
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
        console.log("sayonara");
        this.router.navigate(['/', 'signin']);
        this.dialogRef.close();
  }

}
