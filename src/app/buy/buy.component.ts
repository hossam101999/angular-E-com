import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../product.model';
import { CartService } from '../service/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent {
  cartItems: { product: Product, quantity: number }[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) =>
      total + (item.product.price * item.quantity), 0);
  }

  onSubmit(form: any): void {
    console.log('Form submitted:', form);
    alert("thanks for visiting")
  }
}