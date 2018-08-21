import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { throwError as ObservableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ActivatedRoute ,Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _getallurl = "http://localhost:8086/myapi/users/";
  private _geturl = "http://localhost:8086/myapi/getBookedSeats/";
  private _getusrurl = "http://localhost:8086/myapi/user/";  
  private _posturl = "http://localhost:8086/myapi/user/";
  private _getdateurl = "http://localhost:8086/myapi/getDate/";  
  
  constructor(private http: HttpClient,private router:Router,private route:ActivatedRoute) { }

  public response;
  getBookedSeats() {
    return this.http.get(this._geturl).pipe(map(res => { return res; }));
  }
  getTicketDetails(id) {
    return this.http.get(this._getusrurl+id).pipe(map(res => { return res; }));
  }
  getAlltickets(){
    return this.http.get(this._getallurl).pipe(map(res => { return res; }));
  }
  getDate(){
    return this.http.get(this._getdateurl).pipe(map(res => { return res; }));
  }
  postTicketdetails(data) {
    return this.http.post(this._posturl, data)
      .pipe(catchError(this.errorHandler));
  }
  putTicketDetails(id, data) {
    console.log("datajoi");
    console.log(data);
    return this.http.put(this._posturl+ id, data)
      .pipe(catchError(this.errorHandler));
  }
 
  errorHandler(error: HttpErrorResponse) {
    return ObservableThrowError(error.message || 'server error');
  }
}
