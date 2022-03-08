import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/model/products';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // productid: any;
  // productname: any;
  // productdescription: any;
  // productimage: any;
  // subcatagoryid: any;
  // price: any;
  // discountpercent: any;
  // discountprice: any;
  // reviewscore: any;
  // stock: any;

  productService: ProductsService;
  product: Products [] = [];
  activateroute: ActivatedRoute;
  cartService: CartService;
  router: Router;
  authService: AuthService

  constructor( productservice: ProductsService, cartService: CartService, activaterote: ActivatedRoute, router: Router, authService: AuthService) {
    this.activateroute = activaterote;
    this.router = router;
    this.productService = productservice;
    this.cartService = cartService;
    this.authService = authService;
  }

  ngOnInit(): void {
    const id = parseInt(this.activateroute.snapshot.params['id']);
    this.productService.getProduct(id).subscribe((data)=>{
      this.product = data;
      console.log(this.product)},
      (error)=>{console.log(error);},
      ()=>{console.log("no further data");})
  }
  addtocart(item:any){

    this.cartService.addtoCart(item);

  }

  checkLogIn(){
    return this.authService.isLoggedIn()
  }
}

