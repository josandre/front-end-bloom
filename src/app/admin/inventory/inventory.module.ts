import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { ItemStockListComponent } from './item-stock-list/item-stock-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './item-stock-list/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './item-stock-list/dialog/delete/delete.component';
import { FormDialogComponent as IssuedItemForm } from './issued-items/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent as IssuedItemDelete } from './issued-items/dialog/delete/delete.component';
import { ItemStockListService } from './item-stock-list/item-stock-list.service';
import { IssuedItemsService } from './issued-items/issued-items.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { IssuedItemsComponent } from './issued-items/issued-items.component';

@NgModule({
  declarations: [
    ItemStockListComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    IssuedItemsComponent,
    IssuedItemForm,
    IssuedItemDelete,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InventoryRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [ItemStockListService, IssuedItemsService],
})
export class InventoryModule {}
