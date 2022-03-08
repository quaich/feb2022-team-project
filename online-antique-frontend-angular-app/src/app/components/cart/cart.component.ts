import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public product: any=[];
  //public cartTotal: number;
  public grandTotal !:number;
  public quantity : number=1;

  constructor(private cartService: CartService) { }

  increment() {
    this.quantity += 1;
}

decrement() {
    if(this.quantity >1){
        this.quantity -= 1;
    }
}

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.product=res;
      this.grandTotal=this.cartService.getTotalPrice();

    })
  }
  removeItem(item:any){
this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();

  }



//   ChangeQuantity(index:number, increase:boolean){
//  this.cartService.UpdateCartItems(index, increase);
//   }


  showMessage(){
    alert("We are going to process your order..Please click on Ok for further process");
  }

}


