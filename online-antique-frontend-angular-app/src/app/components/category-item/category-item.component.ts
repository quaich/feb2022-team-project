import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/model/products';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  id:any;
  p: number = 1;
  activeroute: ActivatedRoute;
  service: CategoryService;
  product: Products [] = [];

  constructor(activeroute: ActivatedRoute,service: CategoryService) {
  this.activeroute = activeroute;
  this.service = service;

  }
  ngOnInit(): void {
    const id = parseInt(this.activeroute.snapshot.params['id']);
    this.service.getProductByCategory(id).subscribe((data)=>{
      this.product = data;
      console.log(this.product)},
      (error)=>{console.log(error);},
      ()=>{console.log("no further data");})
    }
}
