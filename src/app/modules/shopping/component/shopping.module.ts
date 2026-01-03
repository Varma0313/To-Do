import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingRoutingModule } from './shopping-routing-module';
import { ShoppingApiService } from './services/shopping-api.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, ShoppingRoutingModule],
  providers: [ShoppingApiService],
})
export class ShoppingModule {}
