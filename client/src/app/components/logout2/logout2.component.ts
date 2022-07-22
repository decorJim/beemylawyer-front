import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { English} from '@app/interfaces/Langues';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL } from '../../../../constants';
import { UserService } from '@app/services/user.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout2.component.html',
  styleUrls: ['./logout2.component.scss']
})

export class Logout2Component implements OnInit {

  public qui: string;
  public cancel: string;
  public leave: string;
  public logout: string;

  public BASE_URL:String=URL;

  constructor(
    public dialogRef: MatDialogRef<Logout2Component>,
    private router: Router,
    public http:HttpClient,
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

