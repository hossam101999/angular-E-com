
// <product-ProductCardComponent.ts
import { Component, Input } from '@angular/core';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DiscountPricePipe } from '../discount-price.pipe';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../service/cart.service';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, DiscountPricePipe, CartComponent,],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent {
  @Input() product!: Product;
  quantity: number = 1;

  constructor(private router: Router, private cartService: CartService
    , private productService: ProductService
  ) { }

  getStars(rating: number): { full: number, half: boolean } {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return { full: fullStars, half: halfStar };
  }

  getStockInfo(): { status: string, statusClass: string } {

    if (this.product.stock >= 0) {
      return { status: 'Available', statusClass: 'in-stock' };
    } else {
      return { status: 'Out of Stock', statusClass: 'out-of-stock' };
    }
  }


  addToCart(): void {
    if (this.product) {
      this.cartService.addProduct(this.product, this.quantity);

    }
  }


  onSelectProduct(): void {
    this.router.navigate(['/product', this.product.id]);
  }
  handleAddToCart(product: any) {
    this.productService.addToCart(product);
    this.router.navigate(['/cart']);
  }

}

// import { Component, Input } from '@angular/core';
// import { Product } from '../product.model';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-product-card',
//   standalone: true,
//   imports: [CommonModule,],
//   templateUrl: './product-card.component.html',
//   styleUrls: ['./product-card.component.css']
// })
// export class ProductCardComponent {
//   @Input() product!: Product;
//   quantity: number = 1;

//   constructor(private router: Router) { }

//   getStars(rating: number): number[] {
//     return Array(Math.round(rating)).fill(0);
//   }

//   getStockStatus(): string {
//     return this.product.stock > 0 ? 'In Stock' : 'Out of Stock';
//   }

//   getStockStatusClass(): string {
//     return this.product.stock > 0 ? 'in-stock' : 'out-of-stock';
//   }

//   onSelectProduct(): void {
//     this.router.navigate(['/product', this.product.id]);
//   }
// }
