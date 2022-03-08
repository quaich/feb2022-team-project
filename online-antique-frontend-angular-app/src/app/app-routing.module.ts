import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
//import { MenuComponent } from './components/menu/menu.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/products/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminComponent } from './components/admin/admin.component';
// configure the routes contain array
import { CheckoutService } from './services/checkout.service';

const routes: Routes  = [
  {path: 'home' , component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path : 'products', component: ProductsComponent},
  {path : 'products/:id', component: ProductComponent},
  {path : 'category', component: CategoryComponent},
  {path : 'category/:id', component: CategoryItemComponent},
  {path : 'register', component: AdminComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  //{path: '*', component: PagenotfoundComponent},
  {path:'cart', component: CartComponent},
  {path:'checkout', component: CheckoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
