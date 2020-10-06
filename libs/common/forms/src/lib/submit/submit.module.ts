import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HackfestSubmitComponent } from './submit.component';

export * from './submit.component';
export * from './submit.module';

@NgModule({
  declarations: [HackfestSubmitComponent],
  imports: [CommonModule],
  exports: [HackfestSubmitComponent],
})
export class HackfestSubmitModule {}
