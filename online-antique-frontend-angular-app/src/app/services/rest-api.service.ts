import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { product } from '../interface/product';
import { login } from '../interface/login';
import { GenericPOST } from '../interface/generic-post';
import { ProductDiscount } from '../interface/product-discount';
import { CategoryDiscount } from '../interface/category-discount';
import { LoginResult } from '../interface/login-result';

import * as moment from "moment";
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  // Define API
  apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  login(login: login){
    localStorage.setItem("username", login.username);

    return this.http
      .post<LoginResult>(
        this.apiURL + '/api/v1/auth/login',
        JSON.stringify(login),
        this.httpOptions 
      ).pipe(map(
        (authResult) => {
          console.log("creating session")
          const expiresAt = moment().add(authResult.expiresIn,'second');
          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
          localStorage.setItem("admin",  authResult.subject.admin);
      })
    );
  }

  addNewProduct(product: product){
    return this.http
      .post<GenericPOST>(
        this.apiURL + '/api/v1/product/add/',
        JSON.stringify(product),
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

  addNewDiscount(productDiscount: ProductDiscount){
    console.log("hi");
    return this.http
      .post<GenericPOST>(
        this.apiURL + '/api/v1/product/add/discount',
        JSON.stringify(productDiscount),
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

  addNewCategoryDiscount(categoryDiscount: CategoryDiscount){
    return this.http
      .post<GenericPOST>(
        this.apiURL + '/api/v1/product/add/discount/category',
        JSON.stringify(categoryDiscount),
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
