import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HackfestCheckboxComponent } from './checkbox.component';
import { HackfestCheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { HackfestCheckboxItemComponent } from './checkbox-item/checkbox-item.component';

export * from './checkbox.component';
export * from './checkbox-item/checkbox-item.component';
export * from './checkbox-group/checkbox-group.component';

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  declarations: [
    HackfestCheckboxComponent,
    HackfestCheckboxGroupComponent,
    HackfestCheckboxItemComponent,
  ],
  exports: [
    HackfestCheckboxComponent,
    HackfestCheckboxGroupComponent,
    HackfestCheckboxItemComponent,
  ],
})
export class HackfestCheckboxModule {}
