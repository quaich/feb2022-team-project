import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GenericPOST } from '../interface/generic-post';
import { order } from '../interface/order';

@Injectable({
  providedIn: 'root'
})

export class CheckoutService  {
  // Define API
  apiURL='http://localhost:3000';
  constructor(private http: HttpClient) {}

  // Http Options

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  addNewOrder(order: order){
    return this.http
      .post<GenericPOST>(
        this.apiURL + '/api/v1/cart/order',
        JSON.stringify(order),
        this.httpOptions
      ).pipe(map((data,error) => {
        if(data){
          console.log(data)
          window.alert(data.status);
        }
        else{
          window.alert(error);
        }
      })
    );
  }
}

