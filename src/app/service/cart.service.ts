import { Injectable } from '@angular/core';
import { Product } from '../product.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { product: Product, quantity: number }[] = [];
  cartItemsChanged = new BehaviorSubject<void>(undefined);
  constructor() { }

  addProduct(product: Product, quantity: number): void {
    const itemProduct = this.cartItems.find(item => item.product.id === product.id);
    if (itemProduct) {
      // تحقق من أن الكمية المضافة لا تتجاوز المخزون
      const newQuantity = itemProduct.quantity + quantity;
      itemProduct.quantity = Math.min(newQuantity, product.stock);
    } else {
      this.cartItems.push({ product, quantity: Math.min(quantity, product.stock) });
    }
    this.cartItemsChanged.next(); // إشعار التغيير
  }



  getCartItems(): { product: Product, quantity: number }[] {
    return this.cartItems;
  }

  removeProduct(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.cartItemsChanged.next()
  }
  getCartItemsChanged(): Observable<void> {
    return this.cartItemsChanged.asObservable();
  }
  updateProductQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item && quantity > 0 && quantity <= item.product.stock) {
      item.quantity = quantity;
      this.cartItemsChanged.next(); // إشعار التغيير
    }




  }
  getCartItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsChanged.next();
  }
}