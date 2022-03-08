import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public productList: any=[];
  public orderproduct: any=[];
  public grandTotal !:number;



  @Input() order = {productid: Array(), username: ''};


  constructor(private cartService: CartService, private api : ApiService , public checkoutService : CheckoutService, public route: Router) {

   }

  ngOnInit(): void {

    this.cartService.getProducts()
    .subscribe(res=>{
      this.orderproduct=res;
      this.grandTotal=this.cartService.getTotalPrice();

    })

    for (let i = 0; i < this.orderproduct.length; i++){
      this.order.productid.push(this.orderproduct[i].productid);
    }
    var username = localStorage.getItem("username") as string
    this.order.username = username;

    // this.api.getProduct()
    // .subscribe(res =>{
    //   this.productList = res;
    //   this.productList.forEach((a:any) => {
    //     Object.assign(a);

    //   });
    // })


  }

placeOrder(){

this.checkoutService.addNewOrder(this.order).subscribe();
console.log(this.order);
}


showMessage(){
  console.log(this.orderproduct)
  alert("order is placed successfully");
}
}
