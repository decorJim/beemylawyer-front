/*******
 component where a profil is display if lawyer sign in he can view his own profil, the edit button and all of their requests
 if the viewer is a client or another lawyer the edit button and the requests won't be visible to them
 * 
 * 
 * 
 * 
 */

import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { English } from '../../interfaces/Langues';
import { UserService } from '../../services/user.service';
import { EditProfilComponent } from '../editProfil/editProfil.component';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../constants/constants';
import { RequestInterface } from '../../interfaces/RequestInterface';
import { Request } from '../../classes/Request';
import { ProfilInterface } from '../../interfaces/ProfilInterface';
import { Profil } from '../../classes/Profil';
import { MyRequestDetailsComponent } from '../my-request-details/my-request-details.component';
import { LogoutComponent } from '../logout/logout.component';


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
    const client = this.webSocketService.getStompClient();

    // Use onConnect to ensure the client is connected before subscribing
    client.onConnect = (frame) => {
      console.log('WebSocket connected:', frame);
  
      // Now you can safely call your subscription methods
      this.myNewRequests();
      this.profilChanges();
    };
  
    client.onStompError = (frame) => {
      console.error('STOMP Error:', frame.headers['message']);
    };
  
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
    // Ensure that the client is active before subscribing to a topic
    const client = this.webSocketService.getStompClient(); // Get the Stomp client
    
    if (client && client.connected) { // Check if the client is connected
      client.subscribe("/lawyers/editedProfil", (message) => {
        // Parse the message body to extract the profile data
        let profilInt = JSON.parse(message.body);
        let profil: Profil = new Profil(profilInt as ProfilInterface);
        
        // Check if the profile matches the one currently displayed
        if (this.userService.getProfilToDisplay().getId() == profil.getId()) {
          this.userService.setProfilToDisplay(profil);
        }
      });
    } else {
      console.error('STOMP client is not connected. Cannot subscribe.');
    }
  }

  myNewRequests() {
    const client = this.webSocketService.getStompClient();

    if (client && client.connected) {
      client.subscribe("/user/".concat(this.userService.getProfil().getId() as string).concat("/new-request"), (message) => {
        let requestInt:RequestInterface = JSON.parse(message.body);
        let request:Request = new Request(requestInt);
        this.userService.getMyRequests().push(request);
      });
    }
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