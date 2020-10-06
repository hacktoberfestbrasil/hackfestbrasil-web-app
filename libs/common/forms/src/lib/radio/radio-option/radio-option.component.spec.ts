import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HackfestRadioOptionComponent } from './radio-option.component';

describe('HackfestRadionOptionComponent', () => {
  let spectator: Spectator<HackfestRadioOptionComponent>;
  const createComponent = createComponentFactory(HackfestRadioOptionComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
