import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../model/products';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  http:HttpClient;
  products: Products[] = [];
  constructor(http: HttpClient) {
    this.http = http;
   }

   public getAllProducts(){

    let x: Observable<Products[]>;
    x = this.http.get<Products[]>("http://localhost:3000/api/v1/products");
    return x;
   }

   public getProduct(id: number){
    let x: Observable<Products[]>;
    x = this.http.get<Products[]>("http://localhost:3000/api/v1/products/" + id);
    return x;
}

  public getProductByCategory(id: number){

    let x: Observable<Products[]>;
    x = this.http.get<Products[]>("http://localhost:3000/api/v1/category/" + id);
    return x;
  }
}
