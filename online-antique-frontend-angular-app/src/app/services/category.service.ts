import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { Products } from '../model/products';
//import { ProductByCategory } from '../model/productByCategory';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  http:HttpClient;
  category: Category[] = [];
  product: Products[] = [];
  constructor(http: HttpClient) {
    this.http = http;
   }

   public getAllCategory(){

    let x: Observable<Category[]>;
    x = this.http.get<Category[]>("http://localhost:3000/api/v1/category");
    return x;
   }

   public getProductByCategory(id: number){

    let x: Observable<Products[]>;
    x = this.http.get<Products[]>("http://localhost:3000/api/v1/category/" + id);
    return x;
   }
}
