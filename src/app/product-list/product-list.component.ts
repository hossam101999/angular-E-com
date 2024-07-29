// productuct -listcomponent
import { Component, OnInit } from '@angular/core'; // إضافة OnInit
import { CommonModule } from '@angular/common';
import { Product } from '../product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../service/product.service'; // تصحيح مسار الاستيراد
import { Router } from '@angular/router'; // استيراد Router

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent], // حذف ProductService من هنا، يجب إضافته كمزود في الموديل أو المكون
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.products;
      },
      error: (err) => {
        console.error('Failed to load products', err); // التعامل مع الأخطاء
      }
    });
  }

  onSelectProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }
}


//   constructor(private productService: ProductService) { }

//   ngOnInit(): void {
//     this.productService.getProducts().subscribe(data => {
//       this.products = data.products;
//     });
//   }
// }