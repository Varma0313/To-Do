import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ShoppingApiService } from '../services/shopping-api.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory-form.component.html',
  styleUrl: './inventory-form.component.scss',
})
export class InventoryFormComponent implements OnInit {
  inventoryFormGroup!: FormGroup;

  productID: any;

  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private api: ShoppingApiService,
    private actroute: ActivatedRoute
  ) {
    this.productID = Number(this.actroute.snapshot.params['id']);
    console.log('Product ID from route:', this.productID);
  }
  ngOnInit(): void {
    this.initForm();
    if (this.productID) this.fetchData();
    // this.addNewProduct();
    // this.updateProduct();
  }

  fetchData() {
    this.api
      .getProducts()
      .pipe(take(1))
      .subscribe((products) => {
        const product = products.find((p) => p.id == this.productID);
        console.log('Fetched product data:', product);
        if (product) {
          this.inventoryFormGroup.patchValue(product);
        }
      });
  }

  initForm() {
    this.inventoryFormGroup = this.fb.group({
      id: '',
      image: '',
      name: '',
      availability: '',
      category: '',
      manufacturer: '',
      price: '',
      discription: '',
    });
  }

  addNewProduct() {
    const formData = this.inventoryFormGroup.value;

    this.api.addProduct(formData).subscribe((res) => {
      console.log('Product added:', res);
      alert('Product added successfully!');
    });
  }

  updateProduct() {
    const formData = this.inventoryFormGroup.value;

    this.api.updateProduct(this.productID, formData).subscribe((res) => {
      console.log('Product updated:', res);

      if (res) {
        alert('Product updated successfully!');
      } else {
        alert('Product not found. Update failed.');
      }
    });
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // create browser preview url
    const previewUrl = URL.createObjectURL(file);

    this.imagePreview = previewUrl;

    // save preview url in form instead of file
    this.inventoryFormGroup.patchValue({
      image: previewUrl,
    });
  }

  onSubmit() {
    if (this.productID) {
      this.updateProduct();
    } else {
      this.addNewProduct();
    }
  }
}
