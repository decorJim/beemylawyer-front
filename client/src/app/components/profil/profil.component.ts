/*******
 component where a profil is display if lawyer sign in he can view his own profil, the edit button and all of their requests
 if the viewer is a client or another lawyer the edit button and the requests won't be visible to them
 * 
 * 
 * 
 * 
 */

import { Component, OnInit } from '@angular/core';
import { LogoutComponent } from '../logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { English } from '@app/interfaces/Langues';
import { UserService } from '../../services/user.service';
import { EditProfilComponent } from '../editProfil/editProfil.component';
import { SocketService } from '@app/services/socket.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../../../constants';
import { RequestInterface } from '@app/interfaces/RequestInterface';
import { Request } from '@app/classes/Request';
import { ProfilInterface } from '@app/interfaces/ProfilInterface';
import { Profil } from '@app/classes/Profil';
import { MyRequestDetailsComponent } from '../my-request-details/my-request-details.component';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public avatar: string;
  public useremail: string;
  public nickname: string;
  public lastLoggedIn: string;
  public lastLoggedOut: string;
  public friends: Array<string>;

  private BASE_URL=URL;

  profilTitle: string;
  info1: string;
  info2: string;
  info3: string;
  info4: string;
  info5: string;
  remove: string;


  constructor(
    public userService:UserService,
    public dialog: MatDialog,
    public webSocketService:SocketService,
    private router: Router,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.getMyRequests();
    this.webSocketService.openConnection();
    this.webSocketService.getStompClient().connect({},(frame)=>{
      this.myNewRequests();
      this.profilChanges();
    });
  
    this.profilTitle = English.profilTitle;
    this.info1 = English.info1;
    this.info2 = English.info2;
    this.info3 = English.info3;
    this.info4 = English.info4;
    this.info5 = English.info5;
    this.remove = English.remove;

  }

  getMyRequests() {
     let link:string=this.BASE_URL.concat("request/lawyer/").concat(this.userService.getProfil().getId() as string);
     let requests:Request[]=[];
     this.http.get(link).subscribe((data:any)=>{
      data.forEach((reqIn:RequestInterface)=>{
         let request:Request=new Request(reqIn);
         requests.push(request);
      });
      this.userService.setMyRequests(requests);
      console.log(this.userService.getMyRequests())
     })

  }

  profilChanges() {
    this.webSocketService.getStompClient().subscribe("/lawyers/editedProfil",(data)=>{
      let profilInt=JSON.parse(data.body);
      let profil:Profil=new Profil(profilInt as ProfilInterface);
      if(this.userService.getProfilToDisplay().getId()==profil.getId()) {
          this.userService.setProfilToDisplay(profil);
      }  
    });
  }

  myNewRequests() {
      this.webSocketService.getStompClient().subscribe("/user/".concat(this.userService.getProfil().getId() as string).concat("/new-request"),
      (data)=>{
        let requestInt:RequestInterface=JSON.parse(data.body);
        let request:Request=new Request(requestInt);
        this.userService.getMyRequests().push(request);
      });
  }


  
  logout() {
    this.dialog.open(LogoutComponent);
  }

  openEditProfil() {
    this.dialog.open(EditProfilComponent,{
      height: '60%',
      width: '43%'
    });
  }

  requestsPage() {
    this.webSocketService.closeConnection();
    this.router.navigate(["/","request"])
  }

  openRequestWithId(id:String) {
    console.log(id);
    MyRequestDetailsComponent.requestId=id;
    this.dialog.open(MyRequestDetailsComponent,{
      height: '60%',
      width: '32%'
    });
  }



  

}