import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  public cartItemList: any=[]
  public productLList= new BehaviorSubject<any>([]);

  constructor() { }

  getProducts(){
   return this.productLList.asObservable();

  }
  setProduct(product: any){
    this.cartItemList.push(...product);
    this.productLList.next(product);
  }

  addtoCart(product:any){

    const exist=this.cartItemList.find((product:any)=>{
      return product.id===product.productid;

    });
    if(exist)
    var qty= exist.quantity++;
    else
    this.cartItemList.push(product);
    this.productLList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);

    // this.cartItemList.push(product);
    // this.productLList.next(this.cartItemList);
    // this.getTotalPrice();
    // console.log(this.cartItemList);

    // if(localStorage.getItem("cartItemList")){
    //   this.cartItemList= JSON.parse(localStorage.getItem("cartItemList"));
    // }
    // this.cartItemList.push({
    //   productid: product.productid,
    //   productname: product.productname,
    //   productdescription:product.productdescription,
    //   price:product.price,
    //   quantity:product.quantity,
    //   total:product.total,
    // });
    // localStorage.setItem("cartItemList", JSON.stringify(this.cartItemList))

  }


  getTotalPrice(): number{
    let grandTotal=0;
    this.cartItemList.map((a:any)=>{
      grandTotal+=a.total;
    })
    return grandTotal;

  }

  removeCartItem(product:any){
    this.cartItemList.map((a:any, index:any)=>{
if(product.id===a.id){
this.cartItemList.splice(index,1);
}
    })
    this.productLList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList=[]
    this.productLList.next(this.cartItemList);
  }

}
