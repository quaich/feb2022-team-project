import { Component, OnInit } from '@angular/core';
import { Category } from './model/category';
import { CategoryService } from './services/category.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent{

  public totalItem: number=0;
  title = 'antique-store';
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  service: CategoryService;
  category: Category[] = [];
  catData: any;

  //public product:Array<Products> = [];

  constructor(service: CategoryService, private cartService: CartService, private authService: AuthService) {
    this.service = service;
   }

  ngOnInit(): void {
    this.service.getAllCategory().
    subscribe((data)=>{
    this.category = data;
    console.log(this.category)},
    (error)=>{console.log(error);},
    ()=>{console.log("no further data");})

    this.getProductCatId();

    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem=res.length;
    })
  }

  getProductCatId(){
    this.service.getAllCategory().subscribe((res) => {
      this.catData = res;
  })
  }

  checkLogIn(){
      return this.authService.isLoggedIn()
  }

  checkAdmin(){
    //return localStorage.getItem("admin")
    return this.authService.isLoggedInAdmin()
  }

  logOut(){
    this.authService.logout();
    if(this.authService.isLoggedOut() === true){
      window.alert("Logout Success!")
    }
  }

}

