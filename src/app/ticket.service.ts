import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor() { }
  private UserData = {
    ticketId:'',
    name: '',
    email: '',
    seats: [],
    price: 0,
    eventDate:new Date(),
    status: ''
  }

  getUser(){
    return this.UserData;
  }

  setUser(ticketId,name,email,seats,price,eventDate){
      this.UserData.ticketId=ticketId;
      this.UserData.name=name;
      this.UserData.email=email;
      this.UserData.seats=seats;
      this.UserData.price=price;
      this.UserData.eventDate=eventDate;
  }
setStatus(status){
  this.UserData.status=status;
}
  resetTicket(){
    this.UserData.ticketId='',
    this.UserData.name='',
    this.UserData.email= '',
    this.UserData.seats=[];
    this.UserData.price= 0,
    this.UserData.eventDate=new Date(),
    this.UserData.status= ''
  } 
}
