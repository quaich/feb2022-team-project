import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'src/app/model/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productname: any;
  p: number = 1;
  service: ProductsService;
  products: Products[] = [];

  //public product:Array<Products> = [];

  constructor(service: ProductsService) {
    this.service = service;
   }

  ngOnInit(): void {
    this.service.getAllProducts().
    subscribe((data)=>{
    this.products = data;
    console.log(this.products)},
    (error)=>{console.log(error);},
    ()=>{console.log("no further data");})
  }

  search(){
    if(this.productname == ""){
      this.ngOnInit();
    }else{
      this.products = this.products.filter(res =>{
      return res.productname.toLocaleLowerCase().match(this.productname.toLocaleLowerCase());
    });
  }
  }
}
