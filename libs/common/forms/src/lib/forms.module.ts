import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HackfestRadioModule } from './radio/radio.module';
import { HackfestCheckboxModule } from './checkbox/checkbox.module';

export * from './radio/radio.module';
export * from './checkbox/checkbox.module';

@NgModule({
  exports: [
    HackfestCheckboxModule,
    HackfestRadioModule,
    ReactiveFormsModule,
  ],
})
export class HackfestFormsModule {}
