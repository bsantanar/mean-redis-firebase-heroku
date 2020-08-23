import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service'
import { Product } from 'src/app/interfaces/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  skuArray: string[] = ['2000378676935P','2000379040766P','2000379450763P','2000379450817P',
  'MPM00004349586','2000379089895P','2000379061044P','2000374667845P'];
  product: Product = null;
  productArray: Product[] = [];
  loading: boolean = false;
  imageToShow:any;

  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  getProductBySku(){
    let sku = this.skuArray[Math.floor(Math.random()*this.skuArray.length)];
    this.loading = true;
    this.productService.getProduct(sku).subscribe(
      res => {
        this.productArray = [];
        this.toastr.success(res.message);
        this.product = { ...res.data }
        //console.log(this.product);
        this.loading = false;
      }, err => {
        this.loading = false;
      }
    );
  }

  getMultipleProducts(){
    this.loading = true;
    this.productService.getMultipleProducts(this.skuArray.join()).subscribe(
      res => {
        this.product = null;
        this.toastr.success(res.message);
        this.productArray = [...res.data];
        this.loading = false;
      }, err => {
        this.loading = false;
      }
    );
  }

  

}
