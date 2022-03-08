import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './components/products/products.component';
import { ProductsService } from './services/products.service';
import { ProductComponent } from './components/products/product/product.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
//import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
//import { CatagoriesComponent } from './components/catagories/catagories.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';

import { CategoryItemComponent } from './components/category-item/category-item.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryService } from './services/category.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';

import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PagenotfoundComponent,
    AdminComponent,
    FooterComponent,
    CategoryItemComponent,
    ProductsComponent,
    ProductComponent,
    CategoryComponent,
    CartComponent,
    CheckoutComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,//.forRoot(routes),
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule
  ],
  providers: [ProductsService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
