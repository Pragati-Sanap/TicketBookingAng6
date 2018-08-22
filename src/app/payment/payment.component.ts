import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpService } from '../http.service';
import { TicketService } from '../ticket.service';
import { map } from 'rxjs/operators'
@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

    /***********************constructor and ngInit***********/
    constructor(private router: Router, private route: ActivatedRoute, private http: HttpService, private ticket: TicketService) { }

    ngOnInit() {
        this.generateRandomNum();
        this.getVar();
    }
    /****************variable declaration**********/
    public actAnswer;
    public answer;

    public userresponse: any;

    public UserData: any;
    getVar() {
        this.UserData = this.ticket.getUser();
    }
    /****************variable declaration**********/
    /*********************generate random no's********/
    generateRandomNum = function () {
        this.cond = true;
        // console.log("generate");
        this.operators = [{
            sign: "+",
            method: function (a, b) { return a + b; }
        }, {
            sign: "-",
            method: function (a, b) { return a - b; }
        }];
        // console.log(this.cond !== false)
        while (this.cond !== false) {
            this.num1 = Math.floor(Math.random() * 100) + 1;
            // console.log(this.num1);
            this.num2 = Math.floor(Math.random() * 100) + 1;
            // console.log(this.num2);

            this.selectedOperator = Math.floor(Math.random() * this.operators.length);

            this.opr = this.operators[this.selectedOperator].sign;
            // console.log(this.opr);
            if (this.num1 > this.num2) {
                this.cond = false;
                this.actAnswer = this.operators[this.selectedOperator].method(this.num1, this.num2)
                console.log(this.actAnswer);
                return this.num1, this.num1, this.opr, this.actAnswer;
            };
        }
    }
    /*********************end generate random no's********/
    /***********************check the answer**********/

    updateData() {
        this.ticket.setStatus("completed");
        this.getVar();
        console.log(this.UserData);
    }
    isSuccess(answer) {
        // console.log("user"+answer);
        // console.log("user"+this.actAnswer);
         console.log(this.actAnswer == answer);
        if (this.actAnswer == answer) {
            console.log("payment success");

            this.http.getTicketDetails(this.UserData.ticketId)
                .subscribe(res => {
                    this.userresponse = res;
                    console.log(this.userresponse.doc.status);
                    console.log(this.userresponse.doc);
                    this.ticket.setStatus(this.userresponse.doc.status);
                    this.getVar();
                    console.log("status on submit  " + this.userresponse.doc.status);
                    if (this.userresponse.doc.status == 'locked') {
                        this.getVar();
                        console.log("nbj,bj")
                        console.log(this.UserData);

                        this.http.putTicketDetails(this.UserData.ticketId, this.UserData)
                            .pipe(map(res => { this.userresponse = res; return res; }))
                            .subscribe(res => {
                                let id = this.UserData.ticketId;
                                console.log(res);
                                this.userresponse=res;
                                 console.log(this.userresponse.docs.status);
                                // let status=this.userresponse.docs.status;
                                if (this.userresponse.docs.status == 'completed') {
                                    this.updateData();
                                    this.router.navigate(['/success', this.UserData.ticketId], { relativeTo: this.route });
                                } else if (this.userresponse.docs.status == 'failed') {
                                    alert('your time is done..!!!......try again...')
                                    this.router.navigate(['/failed'], { relativeTo: this.route });
                                }
                            });
                    } else if (this.UserData.status == 'completed') {
                        alert("Ticket booked alredy.. try different...");
                        this.router.navigate(['/failed'], { relativeTo: this.route });

                    } else if (this.UserData.status == 'failed') {
                        alert("your time is done.. try different...");
                        this.router.navigate(['/failed'], { relativeTo: this.route });

                    }


                });

        } else {
            alert('wrong answer...try booking again..');
            this.router.navigate(['/home'], { relativeTo: this.route });
        }
    }


    /***********************end check the answer**********/

}
/*
isSuccess(answer) {
  // check to make sure the answer is correct of puzzle

  if (this.actAnswer == answer) {
      
      console.log("payment success");
      let id = this.User._id;
      // this.utime = new Date();
      // var time = new Date(this.utime);
      //  this.updateTime = time.getMinutes();
     
      // console.log( "time difference : "+ (this.updateTime - this.createdTime))
      // if (this.updateTime - this.createdTime<=5) {
          this.UserData.status="completed";
          // this.updateData();
          // this.http.putTicketDetails(this.UserData)
          // .pipe(map(res => { this.userresponse = res; return res; }))
          // .subscribe(res => {
          //     let id=this.userresponse.docs._id;
          //     this.id=id;
              this.router.navigate(['/success', id], { relativeTo: this.route });
            // });
      }else {
          alert('Your time is done register again..!!! deleting User');
          //  console.log("deleting User");
          this.UserData.status="failed";
          //  this.updateData();
          this.UserData.seats=[];
          this.UserData.price=0;

      // this.http.put('http://localhost:8085/myapi/user/' + id,this.UserData)
          //  .pipe(map(res => { this.userresponse = res; return res; }))
          //  .subscribe(res => {
               let id=this.userresponse.docs._id;
               this.router.navigate(['/failed'], { relativeTo: this.route });
            //  });
             
      }
  }else{
      alert("Enter right answer");
      this.router.navigate(['/failed'], { relativeTo: this.route });
}
*/