import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HackfestRadioComponent } from './radio.component';
import { HackfestRadioOptionComponent } from './radio-option/radio-option.component';

export * from './radio.component';
export * from './radio-option';

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  declarations: [HackfestRadioComponent, HackfestRadioOptionComponent],
  exports: [HackfestRadioComponent, HackfestRadioOptionComponent],
})
export class HackfestRadioModule {}
