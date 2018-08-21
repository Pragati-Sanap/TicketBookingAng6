import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute,ParamMap} from '@angular/router';
// import {TicketsService} from '../tickets.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  price:number;
  seats:"one person";
  
    constructor(private router:Router,private route:ActivatedRoute) { }
  
  
    onProceed(seats, price){
        var seats=seats;
        var price=price;
        this.router.navigate(['/seats',seats],{relativeTo:this.route});

    }
    ngOnInit() {
      this.route.paramMap.subscribe((params:ParamMap)=>{
        let id=parseInt(params.get('id'));
        })
  
    
    }
  

}
