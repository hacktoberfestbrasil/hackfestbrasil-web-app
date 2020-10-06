import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HackfestCheckboxModule } from './checkbox/checkbox.module';

export * from './checkbox/checkbox.module';

@NgModule({
  exports: [
    HackfestCheckboxModule,
    ReactiveFormsModule,
  ],
})
export class HackfestFormsModule {}
