import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {map} from 'rxjs/operators';
import { HttpService } from '../http.service';
import { TicketService } from '../ticket.service';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,
    private httpService:HttpService,private ticket:TicketService) { }
 
  public UserData:any;
    public id=0;
  getVar(){
   this.UserData= this.ticket.getUser();
   this.ticketId=this.UserData.ticketId;
   console.log(this.UserData);
   this.id =this.ticketId;
  }
  public ticketId;
  destroy(){
    this.id=0;
    // this.ticket.resetTicket();
  }
  ngOnInit() {

      console.log(this.id);
      this.getVar();
      if(this.id==0){
         this.router.navigate(['/home'], { relativeTo: this.route });
      }
      this.destroy();

    }

}
