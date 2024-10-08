import { Injectable } from '@angular/core';
import { Profil } from '../classes/Profil';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {

  profils:Profil[] = [];

  constructor(
  ) { 
  }

  updateProfils(profils:Profil[]):void {
    this.profils = [];
    this.profils = profils;
  }

}
