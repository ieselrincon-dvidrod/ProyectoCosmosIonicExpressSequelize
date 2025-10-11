import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InsertPageRoutingModule } from './insert-routing.module';
import { InsertPage } from './insert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // <-- lo ponemos junto a FormsModule
    IonicModule,
    InsertPageRoutingModule
  ],
  declarations: [InsertPage]
})
export class InsertPageModule {}
