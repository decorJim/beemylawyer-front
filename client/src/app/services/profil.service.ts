import { Injectable } from '@angular/core';
import { Profil } from '@app/classes/Profil';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  profils:Profil[]=[];

  constructor(
    public userService:UserService,
    ) { }

  updateProfils():void {
    this.profils=[];
    this.userService.users.forEach((v,k)=>{
       this.profils.push(v);
    });
  }


}
