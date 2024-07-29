import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartItemCount();
    this.cartService.getCartItemsChanged().subscribe(() => {
      this.updateCartItemCount();
    });
  }

  updateCartItemCount(): void {
    this.cartItemCount = this.cartService.getCartItemCount();
  }
}
