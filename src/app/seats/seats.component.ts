import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { TicketService } from '../ticket.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ids } from './ids';
import {map} from 'rxjs/operators'
@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {
  /*****************************variables declaration***************/
 
 getVar(){
  this.UserData= this.ticket.getUser();
 }
  public  UserData:any;
    public selectedOption: string;
  public count: number;
  public noOfSeats: number;

  public response: any;
  public seats: [string];

  public ids = ids;
  public $tempArraySeats = [];
  public DisplayValue = [];
  public class1;
  public class2;
  public available;
  public pos;
  public temp1=[];
  public date = new Date();
  public bseats=[];
  public userResponse: any;
/************************Save Data******************/
saveTicketDetails(){
  this.ticket.setStatus('locked');
  
  this.httpService.postTicketdetails(this.UserData).pipe(map(res => { this.userResponse = res; return res; }))
  .subscribe(res => {
      let id = this.userResponse.docs._id;
      this.ticket.setUser(id,this.UserData.name,this.UserData.email,this.UserData.seats,this.UserData.price,this.UserData.eventDate);
       console.log(res);
     this.router.navigate(['/payment', id], { relativeTo: this.route });
      
  });

}
/************************end Save Data******************/
/**********************GETDATE***********************/
changedate(date){
  
  this.UserData.eventDate=date;
  this.resetValue();
  for(var i=0;i<this.bseats.length;i++){
    document.getElementById(this.bseats[i]).classList.remove("no-available");
  }
  this.getSeats(date);     
 }

/**********************END GETDATE***********************/
  /********************On Selecting Seats***********/
 
  checkClass(pos) {
    this.class1 = document.getElementById(this.ids[pos]).classList.contains("no-available");
    // console.log(this.class1);
    this.class2 = document.getElementById(this.ids[pos]).classList.contains("selected");
    this.available=this.class1 == false && this.class2 == false;
  }
  selectSeats(pos){
    document.getElementById(this.ids[pos]).classList.add("selected");
    this.$tempArraySeats.push(this.ids[pos]);
    this.DisplayValue = this.$tempArraySeats;
    this.count--;
    this.pos++;
    // console.log(this.ids[pos]+" count "+this.pos)
  }
  onSelect(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var id = target.attributes.id.nodeValue;
  
    this.pos = this.ids.indexOf(id);
    this.checkClass(this.pos);
    var x = this.count;
     
    var br=this.pos+1;

 
    if (this.class1 == false) {
      this.checkClass(this.pos);
      for (var j = 0; j < x; j++) {
      this.checkClass(this.pos);
      console.log(br%5)
      if (this.count > 0 &&this.available){
            this.checkClass(this.pos);
            this.selectSeats(this.pos);   
            if(br%5==0)
            {break;}      
            br++;
           }
       }
        if (this.count >= 0 && this.class2 == true) {
        for (var i = 0; i < this.$tempArraySeats.length; i++) {
          if (this.ids[this.pos] == this.$tempArraySeats[i]) {
            document.getElementById(id).classList.remove("selected");
            this.count++;
            this.$tempArraySeats.splice(i, 1);
            this.DisplayValue = this.$tempArraySeats;
          }
        }
      }

      console.log(this.DisplayValue);
      this.UserData.seats = this.$tempArraySeats;

    }else{
      alert("Select another seat..!!");
    }
  }
  /********************On Selecting Seats***********/
  /******************getSeats***********************/
  getSeats(date) {
    var date=date;
    this.httpService.getBookedSeats()
      .subscribe(res => {
        this.response = res;
        console.log(this.response);
       
        var len=this.response.seats.temp1.length;
        this.bseats=[];
        console.log(date);
        for (var i = 0; i < len; i++) {
            if(this.response.seats.tempd[i]===date){
               
                var tempseat=this.response.seats.temp1[i];
                
            for (var j = 0; j < tempseat.length; j++) {
              this.bseats.push(tempseat[j]);

               document.getElementById(tempseat[j]).classList.add("no-available");
             }
          }
        }
        console.log(this.bseats);
      });
  }

  /******************end getSeats***********************/
  /***************setting the no of seats*********/
  options = [
    { name: "one person", value: 1 },
    { name: "two person", value: 2 },
    { name: "three person", value: 3 },
    { name: "five person", value: 4 }
  ]
  resetValue() {
    for (var i = 0; i < this.$tempArraySeats.length; i++) {
      document.getElementById(this.$tempArraySeats[i]).classList.remove('selected');
    }
    this.$tempArraySeats = [];
    this.DisplayValue = [];
  }
  selected(seat) {
    this.count = seat;
    // console.log(this.count);
    this.noOfSeats = seat;
    this.UserData.price = 300 * seat;
    console.log("count:" + this.count + " price:" + this.UserData.price)
  }

  setvalue() {

    // console.log("Selected Seats: " + this.selectedOption);
    if (this.selectedOption == "one person") {
      this.selected(1);
      this.resetValue();
    }
    else if (this.selectedOption == "two person") {
      this.selected(2);
      this.resetValue();
    }

    else if (this.selectedOption == "three person") {
      this.selected(3);
      this.resetValue();
    }

    else if (this.selectedOption == "five person") {
      this.selected(5);
      this.resetValue();

    }

  }
  /**************end of setting the no of seats **********/
  /*****************constructor and ngOnInit**************/
  constructor(private router: Router, private route: ActivatedRoute, private httpService: HttpService,private ticket:TicketService) { }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let seats = params.get('seats');
      // console.log(seats);
      this.selectedOption = seats;
      // console.log(this.selectedOption);
    });

    this.httpService.getDate()
    .subscribe(res => {
      this.response = res;
       this.changedate(this.response.docs);
    this.getSeats(this.response.docs);

    });
    this.getVar();
    this.setvalue();
    // this.getSeats();
   
  }
  /***************** end of constructor and ngOnInit**************/

}
