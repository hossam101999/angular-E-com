import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../service/cart.service';
import { Product } from '../product.model';
import { ProductService } from '../service/product.service';
import { DiscountPricePipe } from '../discount-price.pipe';

import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, DiscountPricePipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: { product: Product, quantity: number }[] = [];

  constructor(private cartService: CartService, private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
    ,) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeItem(productId: number): void {
    this.cartService.removeProduct(productId);
    this.loadCartItems();
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateProductQuantity(productId, quantity);
    this.loadCartItems();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) =>
      total + (this.calculateDiscountedPrice(item.product.price, item.product.discountPercentage) * item.quantity), 0);
  }

  // دالة لحساب السعر بعد الخصم
  calculateDiscountedPrice(price: number, discountPercentage: number): number {
    return price - (price * discountPercentage / 100);
  }
  addTobuy(): void {
    this.router.navigate(['/cart']);

  }
}