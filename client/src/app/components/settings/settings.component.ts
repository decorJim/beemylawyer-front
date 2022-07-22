import { Component, OnInit } from '@angular/core';
import { LightGrey} from '@app/interfaces/Themes';
import { English } from '@app/interfaces/Langues';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  langue: string = '';

  public change: string;
  public parameter: string;
  public theme: string;
  public confirm: string;

  public Light_grey: string;
  public Dark_grey: string;
  public Deep_Purple: string;
  public Ligh_blue: string;
  public Light_Pink: string;
  public cancel: string;


  constructor(

  ) { }

  ngOnInit(): void {

      this.change = English.change;
      this.parameter = English.parameter;
      this.theme = English.theme;
      this.confirm = English.confirm2;
      this.cancel = English.cancel;

      this.Light_grey = English.Light_grey;
      this.Dark_grey = English.Dark_grey;
      this.Deep_Purple = English.Deep_Purple;
      this.Ligh_blue = English.Ligh_blue;
      this.Light_Pink = English.Light_Pink;

      document.getElementById("title0")!.style.backgroundColor = LightGrey.main;
      document.getElementById("title0")!.style.color = LightGrey.text;
      document.getElementById("langue")!.style.backgroundColor = LightGrey.main;
      document.getElementById("langue")!.style.color = LightGrey.text;
      document.getElementById("langue2")!.style.backgroundColor = LightGrey.main;
      document.getElementById("langue2")!.style.color = LightGrey.text;
 
  }

 

  
  onValChange(value: any){
      this.change = English.change;
      this.parameter = English.parameter;
      this.theme = English.theme;
      this.confirm = English.confirm2;

      this.Light_grey = English.Light_grey;
      this.Dark_grey = English.Dark_grey;
      this.Deep_Purple = English.Deep_Purple;
      this.Ligh_blue = English.Ligh_blue;
      this.Light_Pink = English.Light_Pink;
  }


  onChange(value: any) {
 
      document.getElementById("title0")!.style.backgroundColor = LightGrey.main;
      document.getElementById("title0")!.style.color = LightGrey.text;
      document.getElementById("langue")!.style.backgroundColor = LightGrey.main;
      document.getElementById("langue")!.style.color = LightGrey.text;
      document.getElementById("langue2")!.style.backgroundColor = LightGrey.main;
      document.getElementById("langue2")!.style.color = LightGrey.text;
    
  }

  //Pour que VS code piss off
  something() {
    console.log(this.change);
    console.log(this.confirm);
    console.log(this.parameter);
    console.log(this.theme);

    console.log(this.Ligh_blue);
    console.log(this.Light_Pink);
    console.log(this.Light_grey);
    console.log(this.Dark_grey);
    console.log(this.Deep_Purple);
  }
}