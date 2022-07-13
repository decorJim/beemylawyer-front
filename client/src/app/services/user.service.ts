import { Injectable } from '@angular/core';
import { Profil } from '@app/classes/Profil';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private useremail:String;
  private userProfil:Profil;
  private fullname:String;

  constructor() {

  }

  getUseremail():String {
    return this.useremail;
  }

  setUseremail(email:String) {
    this.useremail=email;
  }

  setProfil(profil:Profil) {
    this.userProfil=profil;
    this.fullname=profil.getFname()+" "+profil.getLname();
  }

  getProfil():Profil {
    return this.userProfil;
  }

  getFullname():String {
    return this.fullname;
  }



}
