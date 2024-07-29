import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private Api = 'https://dummyjson.com/products';
  private cartItems: any[] = [];
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.Api);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.Api}/${id}`);
  }
  addToCart(item: any) {
    this.cartItems.push(item);
  }

  getCartItems(): any[] {
    return this.cartItems;
  }
}
