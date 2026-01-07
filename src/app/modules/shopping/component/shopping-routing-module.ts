import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyComponent } from './dummy/dummy.component';
import { LoginComponent } from './login/login.component';
import { ShoppingRootComponent } from './shopping-root/shopping-root.component';
import { MenuComponent } from './menu/menu.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProfileComponent } from './profile/profile.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'root', component: ShoppingRootComponent },
  { path: 'menu', component: MenuComponent },
  {
    path: 'inventory',
    component: InventoryComponent,
    children: [
      { path: 'form', component: InventoryFormComponent },
      { path: 'form/:id', component: InventoryFormComponent },
      { path: 'view', component: InventoryViewComponent },
    ],
  },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
