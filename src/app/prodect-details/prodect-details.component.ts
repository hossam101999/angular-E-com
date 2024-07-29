import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
//import products from '../../assets/products.json'; 
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { DiscountPricePipe } from '../discount-price.pipe';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, DiscountPricePipe],
  templateUrl: './prodect-details.component.html',
  styleUrl: './prodect-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  // products: Product[] = products as Product[];
  product!: Product;
  quantity: number = 1;

  constructor(private route: ActivatedRoute, private router: Router
    , private productService: ProductService, private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe(data => {
        this.product = data;
        if (this.product) {
          console.log('Product loaded:', this.product);
          this.quantity = 1;
        } else {
          console.error('Product not found');
        }
      });
    }
  }


  getStockStatus(): string {
    return this.product?.stock > 0 ? 'In Stock' : 'Out of Stock';
  }

  getStockStatusClass(): string {
    return this.product?.stock > 0 ? 'in-stock' : 'out-of-stock';
  }

  getStars(rating: number): { full: number, half: boolean } {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return { full: fullStars, half: halfStar };
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }


  // addToCart(): void {
  //   console.log('Product added to cart:', this.product);
  //   console.log('Quantity:', this.quantity);
  // }

  addToCart(): void {
    if (this.product) {
      this.cartService.addProduct(this.product, this.quantity);
      this.router.navigate(['/cart']);
    }
  }

  onSelectProduct(): void {
    this.router.navigate(['/product', this.product.id]);
  }
}
