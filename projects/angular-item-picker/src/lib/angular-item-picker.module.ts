// imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

import { NgModule } from '@angular/core';
import { ItemPickerFrameComponent } from './item-picker-frame/item-picker-frame.component';
import { ItemInputComponent } from './item-input/item-input.component';

@NgModule({
  declarations: [ItemPickerFrameComponent, ItemInputComponent],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    BrowserModule,
    MatButtonModule
  ],
  providers: [],
  exports: [
    ItemPickerFrameComponent,
    ItemInputComponent,
    MatButtonModule,
    MatInputModule
  ]
})
export class AngularItemPickerModule {}
