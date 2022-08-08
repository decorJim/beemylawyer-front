import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Profil } from '@app/classes/Profil';
import { UserService } from '@app/services/user.service';


@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit {
  
  static lawyerId:String="";
  lawyer:Profil;
  creationDate:String=Date();
  state:String="new";

  checkoutForm:FormGroup;
  


  constructor(private formBuilder:FormBuilder,public userService:UserService,public dialog: MatDialogRef<NewRequestComponent>) {
    
  }

 
  ngOnInit() {
      this.lawyer=this.userService.users.get(this.lawyerId) as Profil;
      this.checkoutForm= this.formBuilder.group({
        id:'',
        lawyerId:this.lawyerId,
        lawyerName:this.lawyer.getFullName(),
        creationDate:this.creationDate,
        state:this.state,
        clientName:'',
        phoneNumber:'',
        clientEmail:'',
        description: '',
      });
  }

  onSubmit() {
    console.info(this.checkoutForm.value);
    this.dialog.close();
    alert("New request sent !");
  }

  get lawyerId() {
    return NewRequestComponent.lawyerId;
  }

}
