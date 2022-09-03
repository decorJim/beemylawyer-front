import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Profil } from '@app/classes/Profil';
import { Request } from '@app/classes/Request';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-my-request-details',
  templateUrl: './my-request-details.component.html',
  styleUrls: ['./my-request-details.component.scss']
})
export class MyRequestDetailsComponent implements OnInit {

  constructor(
    private userService:UserService
  ) { }

  requestForm:FormGroup;
  static requestId:String="";
  myRequest:Request;

  model:Profil;

  get requestId() {
    return MyRequestDetailsComponent.requestId;
  }

  ngOnInit() {
     this.myRequest=this.userService.getMyRequests().find((request)=>request.getId()==this.requestId)!;
     
     this.model=this.userService.getProfil();
  }

}
