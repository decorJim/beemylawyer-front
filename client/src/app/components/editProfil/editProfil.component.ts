import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { Profil } from '@app/classes/Profil';
import { ProfilInterface } from '@app/interfaces/ProfilInterface';
import { SocketService } from '@app/services/socket.service';
import { UserService } from '@app/services/user.service';
import { URL } from '../../../../constants';

@Component({
  selector: 'app-editProfil',
  templateUrl: './editProfil.component.html',
  styleUrls: ['./editProfil.component.scss']
})
export class EditProfilComponent implements OnInit {

  constructor(public dialog: MatDialogRef<EditProfilComponent>,public userService:UserService, private http: HttpClient,public webSocketService:SocketService) { }

  private readonly BASE_URL: string = URL;

  @ViewChild('skill') skillinput: ElementRef;

  model:Profil;
  email:String;
  fname:String;
  lname:String;
  cposition:String;
  phonenum:String;
  bio:String;
  skills:String[]=[];

  oldSkills=new Map<Number,String>();


  ngOnInit() {
     this.setInitialValue();
  }

  setInitialValue() {
    this.model=this.userService.getProfil();
    this.email=this.model.getUseremail();
    this.fname=this.model.getFname();
    this.lname=this.model.getLname();
    this.cposition=this.model.getCposition();
    this.phonenum=this.model.getPhoneNumber();
    this.bio=this.model.getBio();
    this.skills=this.model.getSkills();
    console.log("skills",this.model.getSkills())
  }

  isDifferent():Boolean {
    if(this.email!=this.model.getUseremail() || this.fname!=this.model.getFname() || this.lname!=this.model.getLname() || 
    this.cposition!=this.model.getCposition() || this.phonenum!=this.model.getPhoneNumber() || this.bio!=this.model.getBio()) {
      return true;
    }
    return false;
  }

  isEmpty():Boolean {
    if(this.email==null || this.fname==null || this.lname==null || this.cposition==null || this.phonenum==null || this.bio==null) {
      return true;
    }
    return false;
  }

  isAbsent():Boolean {
    if(this.email.length==0 || this.fname.length==0 || this.lname.length==0 || this.cposition.length==0 || this.phonenum.length==0 || this.bio.length==0) {
      return true;
    }
    return false;
  }

  skillDifferent():String[] {
    let diff:String[]=[];
    this.skills.filter((skill)=>{
      if(!this.model.getSkills().includes(skill)) {
        diff.push(skill);
      }
    });
    return diff;
  }

  saveProfil() {
    if(this.isEmpty() || this.isAbsent()) {
       alert("empty fields detected !");
       this.setInitialValue();
    }
    else if(this.isDifferent() || this.skillDifferent().length==0) {
      const profile={
         id:this.model.getId(), 
         useremail:this.email,
         fname:this.fname,
         lname:this.lname,
         bio:this.bio,
         cposition:this.cposition,
         skills:this.skills,
         pic:this.model.getPic(),
         phonenumber:this.phonenum
      }

      let link:string=this.BASE_URL+"user/profil/modify";

      this.http.put<any>(link,profile).subscribe((data)=>{
        console.log("data received",data);
        let profil:Profil=new Profil(data as ProfilInterface);
        this.userService.setProfil(profil);
        this.setInitialValue();
        this.webSocketService.getStompClient().send("/app/profil",{},JSON.stringify(this.userService.getProfil()));
      });
    }
    console.log(this.skillDifferent().length);
    this.dialog.close();
  }

  addSkill(skill:String):void {
    this.skills.push(skill);
    console.info(this.skillinput.nativeElement.value);
    this.skillinput.nativeElement.value="";
  }

  removeSkill(skill:String):void {
    const index = this.skills.indexOf(skill);
        if (index > -1) {
            this.skills.splice(index, 1); 
        }
  }

}
