import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingApiService } from '../services/shopping-api.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  products: any[] = [];

  constructor(private api: ShoppingApiService) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Products from API:', data);
      },
      error: (err) => {
        console.error('Failed to load products', err);
      },
    });
  }

  // 👇 product details from parent
  @Input() product: any;

  // 👇 quantity
  quantity: number = 0;

  // 👇 send quantity change to parent if needed
  @Output() quantityChange = new EventEmitter<number>();

  increaseQty() {
    if (this.quantity < 5) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  }

  decreaseQty() {
    if (this.quantity > 0) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
}
