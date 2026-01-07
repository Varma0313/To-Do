import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingApiService {
  private baseUrl = 'http://localhost:3000/api';
  private productsUrl = 'data/products.json';

  private products: any[] = []; // ✅ in-memory store

  constructor(private http: HttpClient) {}

  login(body: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, body);
  }

  // 🔄 Load once from JSON → then always use memory
  getProducts(): Observable<any[]> {
    if (this.products.length) {
      return of(this.products);
    }

    return new Observable((observer) => {
      this.http.get<any[]>(this.productsUrl).subscribe((data) => {
        this.products = data;
        observer.next(this.products);
        observer.complete();
      });
    });
  }

  // 📦 READ ONE (dummy)
  getSingleProduct(id: number): Observable<any> {
    const product = this.products.find((p) => p.id === id);
    return of(product);
  }

  // // 📦 READ ONE
  // getSingleProduct(id: number): Observable<any> {
  //   const product = this.products.find(p => p.id === id);
  //   return of(product);
  // }

  // ➕ CREATE
  addProduct(product: any): Observable<any> {
    product.id = Date.now();
    this.products.push(product);
    return of(product);
  }

  // ✏️ UPDATE
  updateProduct(id: number, updated: any): Observable<any> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index > -1) {
      this.products[index] = { ...this.products[index], ...updated };
      return of(this.products[index]);
    }
    return of(null);
  }

  // ❌ DELETE
  deleteProduct(id: number): Observable<boolean> {
    this.products = this.products.filter((p) => p.id !== id);
    return of(true);
  }

  // // ➕ ADD PRODUCT (API ready)
  // addProduct(product: any): Observable<any> {
  //   // 🔴 local json can't accept POST — this is for future API
  //   return this.http.post(`${this.baseUrl}/products`, product);
  // }

  // // ✏️ UPDATE PRODUCT (API ready)
  // updateProduct(id: number, product: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/products/${id}`, product);
  // }
}
