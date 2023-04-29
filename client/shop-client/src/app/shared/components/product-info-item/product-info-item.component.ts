import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BasketProductPage } from 'src/app/shared/models/basket-product-page'; 

@Component({
  selector: 'app-product-info-item',
  templateUrl: './product-info-item.component.html',
  styleUrls: ['./product-info-item.component.scss']
})
export class ProductInfoItemComponent implements OnInit {
  @Input() product: BasketProductPage = {} as BasketProductPage
  showDeleteProduct = false
  @Input() changeAmount = false

  constructor(private router: Router){}

  fullPrice = 0
  @Output() fullPriceChange = new EventEmitter<number>()
  @Output() productsChange = new EventEmitter<number>()

  ngOnInit(): void {
    this.fullPrice = this.product.product.price * this.product.count
  }

  onPlusClick(){
    this.product.count++
    this.fullPrice = this.product.product.price * this.product.count
    this.showDeleteProduct = false
    this.onFullPriceChange()
  }

  onMinusClick(){
    this.product.count = (this.product.count == 0) ? 0 : this.product.count - 1
    this.showDeleteProduct = (this.product.count == 0) ? true : false
    this.fullPrice = this.product.product.price * this.product.count
    this.onFullPriceChange()
  }

  onFullPriceChange(){
    this.fullPriceChange.emit(this.fullPrice)
  }

  onDeleteClick(){
    this.productsChange.emit(this.product.product.id || 0)
  }

  onImageClick(){
    this.router.navigate(['/product'], {state: {productId: this.product.product.id}})
  }
}
