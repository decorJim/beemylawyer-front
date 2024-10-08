import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Profil } from '../../classes/Profil';
import { SocketService } from '../../services/socket.service';
import { UserService } from '../../services/user.service';
import { URL } from '../../constants/constants';


@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit {
  
  static lawyerId:String="";
  lawyer:Profil;
  state:String="new";
  
  checkoutForm:FormGroup;
  
  BASE_URL:String=URL;


  constructor(
    private formBuilder:FormBuilder,
    public userService:UserService,
    public dialog: MatDialogRef<NewRequestComponent>,
    public http:HttpClient,
    ) {
    
  }

 
  ngOnInit() {
   
      this.lawyer=this.userService.users.get(this.lawyerId) as Profil;
      this.checkoutForm= this.formBuilder.group({
        id:'',
        lawyerId:this.lawyerId,
        lawyerName:this.lawyer.getFullName(),
        creationDate:'',
        state:this.state,
        clientName:'',
        phoneNumber:'',
        clientEmail:'',
        description: '',
      });
  }

  checkEmptyField() {
    if(!this.checkoutForm.value['clientName'] || !this.checkoutForm.value['clientEmail'] || !this.checkoutForm.value['description'] ||
    !this.checkoutForm.value['phoneNumber']) {
       return true;
    }
    return false;
  }

  onSubmit() {
    console.log(this.checkEmptyField());
    if(!this.checkEmptyField()) {
      let link:string=this.BASE_URL.concat('request/create');
      this.http.post(link,this.checkoutForm.value).subscribe((data)=>{
        console.log(data);
        this.dialog.close();
        alert("New request sent !");
      })
    }
    else {
      alert("Empty field detected !");
    }
  }


  get lawyerId() {
    return NewRequestComponent.lawyerId;
  }

}
