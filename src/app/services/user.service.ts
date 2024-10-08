import { Injectable } from '@angular/core';
import { Profil } from '../classes/Profil';
import { Request } from '../classes/Request';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private useremail:String;
  private userProfil:Profil;
  public myRequests:Request[] = [];
  private profilToDisplay:Profil;

  public users:Map<String,Profil> = new Map();  // id and profil 
  public display:boolean=false;

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
  }

  getProfil():Profil {
    return this.userProfil;
  }

  setProfilToDisplay(profil:Profil) {
    this.profilToDisplay=profil;
  }

  getProfilToDisplay():Profil {
    return this.profilToDisplay;
  }

  getMyRequests():Request[] {
    return this.myRequests;
  }

  setMyRequests(requests:Request[]):void {
    this.myRequests=requests;
  }


  getProfils() {
    let profils = [];
    this.users.forEach((v, k) => {
      profils.push(v);
    });
    return profils;
  }



}
