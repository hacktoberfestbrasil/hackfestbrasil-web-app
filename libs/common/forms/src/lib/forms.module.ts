import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HackfestSubmitModule } from './submit/submit.module';
import { HackfestRadioModule } from './radio/radio.module';
import { HackfestCheckboxModule } from './checkbox/checkbox.module';

export * from './submit/submit.module';
export * from './radio/radio.module';
export * from './checkbox/checkbox.module';

@NgModule({
  exports: [
    HackfestCheckboxModule,
    HackfestRadioModule,
    HackfestSubmitModule,
    ReactiveFormsModule,
  ],
})
export class HackfestFormsModule {}
