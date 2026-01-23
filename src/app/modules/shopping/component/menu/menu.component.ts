import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgFor, NgIf } from '@angular/common';
import { ShoppingApiService } from '../services/shopping-api.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, ProductCardComponent, NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit, OnDestroy {
  products: any[] = [];
  productsuscription: any;
  loader: boolean = true;
  constructor(private api: ShoppingApiService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  // getProducts() {
  //   this.loader = true;
  //   this.productsuscription = this.api.getProducts().subscribe((data) => {
  //     this.products = data;
  //     this.loader = false;
  //   });
  // }

  getProducts() {
    this.loader = true;

    this.productsuscription = this.api
      .getProducts()
      .pipe(delay(1000))
      .subscribe({
        next: (data) => {
          this.products = data;
          this.loader = false;
        },
        error: () => {
          this.loader = false;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.productsuscription) this.productsuscription.unsubscribe();
  }

  logout() {}
}
