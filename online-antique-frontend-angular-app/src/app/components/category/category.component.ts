import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/model/products';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  service: CategoryService;
  product: Products [] = [];
  catData: any;
  activateroute!: ActivatedRoute;

  constructor(service: CategoryService) {
    this.service = service;
  }
  ngOnInit(): void {
    const id = parseInt(this.activateroute.snapshot.params['id']);
    this.service.getProductByCategory(id).subscribe((data)=>{
      this.product = data;
      console.log(this.product)},
      (error)=>{console.log(error);},
      ()=>{console.log("no further data");})
  }
  buttonClick(): void{
    
  }
}  



