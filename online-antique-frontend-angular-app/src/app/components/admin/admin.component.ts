import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

/**
 *                    TODO
 * Check user token vs server token to authenticate
 * specific actions (admin / cart purchase)
 * 
 * 
 */

export class AdminComponent implements OnInit {
  @Input() product = {productName: '',productDescription: '',productImage: '',subCategoryId : '',price: '', stock: ''};
  @Input() productDiscount = {productName: '', discountPrice: '', discountPercent: ''};
  @Input() categoryDiscount = {subCategoryName: '', discountPercent: ''};
  constructor(public restApi: RestApiService, public router: Router) {}
  ngOnInit() {}
  submitProduct() {
    this.restApi.addNewProduct(this.product).subscribe();
  }

  submitDiscount() {
    this.restApi.addNewDiscount(this.productDiscount).subscribe();

  }

  submitCategoryDiscount(){
    this.restApi.addNewCategoryDiscount(this.categoryDiscount).subscribe();
  }
}
