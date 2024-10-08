import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Request } from '../../classes/Request';
import { UserService } from '../../services/user.service';
import { URL } from '../../constants/constants';

@Component({
  selector: 'app-my-request-details',
  templateUrl: './my-request-details.component.html',
  styleUrls: ['./my-request-details.component.scss']
})
export class MyRequestDetailsComponent implements OnInit {

  constructor(
    private userService:UserService,
    private http: HttpClient,
    public dialog: MatDialogRef<MyRequestDetailsComponent>
  ) { }

  requestForm:FormGroup;
  static requestId:String="";
  myRequest:Request;

  private readonly BASE_URL: string = URL;


  get requestId() {
    return MyRequestDetailsComponent.requestId;
  }

  ngOnInit() {
     this.myRequest=this.userService.getMyRequests().find((request)=>request.getId()==this.requestId)!;
  }

  acceptRequest() {
     this.myRequest.setState("Accepted");
     console.info("myR",this.myRequest);
     console.info("array R",this.userService.getMyRequests().find((request)=>request.getId()==this.myRequest.getId())!);
     let link:string=this.BASE_URL+"request/accept";
     this.http.post(link,this.myRequest).subscribe((data)=>{
      console.log(data);
      this.dialog.close();
     })
  }

  cancel() {
    this.dialog.close();
  }

}
