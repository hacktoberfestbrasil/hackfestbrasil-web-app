import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  Spectator,
  SpectatorHost,
  createHostFactory,
  createComponentFactory,
} from '@ngneat/spectator';

import { HackfestCheckboxComponent } from './checkbox.component';

const VIEWS = {
  onlyCheck: `<hackfest-checkbox [formControl]="form"></hackfest-checkbox>`,
  withLabel: `<hackfest-checkbox [formControl]="form">Label</hackfest-checkbox>`,
  withCustomId: `<hackfest-checkbox id="x" [formControl]="form"></hackfest-checkbox>`,
};

@Component({ selector: 'hackfest-custom-form', template: '' })
class CustomFormComponent {
  form = new FormControl();
}

describe('HackfestCheckboxComponent', () => {
  describe('Host', () => {
    let spectator: SpectatorHost<HackfestCheckboxComponent, CustomFormComponent>;
    const createHost = createHostFactory({
      component: HackfestCheckboxComponent,
      host: CustomFormComponent,
      imports: [ReactiveFormsModule],
    });

    describe('Views', () => {
      it('should display only input', () => {
        spectator = createHost(VIEWS.onlyCheck);
        expect(spectator.query('.hackfest-checkbox')).toMatchSnapshot();
      });

      it('should display checkbox with label', () => {
        spectator = createHost(VIEWS.withLabel);
        expect(spectator.query('.hackfest-checkbox')).toMatchSnapshot();
      });

      it('should display checkbox with custom id', () => {
        spectator = createHost(VIEWS.withCustomId);
        expect(spectator.query('.hackfest-checkbox')).toMatchSnapshot();
      });
    });

    describe('Props', () => {
      it('should create an instance', () => {
        spectator = createHost(VIEWS.withCustomId);
        const input = spectator.query('.hackfest-checkbox > input');
        expect(input.getAttribute('id')).toEqual('x');
      });
    });
  });

  describe('Forms', () => {
    let spectator: Spectator<HackfestCheckboxComponent>;
    const createComponent = createComponentFactory({
      component: HackfestCheckboxComponent,
      imports: [FormsModule, ReactiveFormsModule],
    });

    it('should create', () => {
      spectator = createComponent();
      expect(spectator.component).toBeTruthy();
    });

    it('should value changed if set value', () => {
      spectator.component.control.setValue('abc');
      expect(spectator.component.control.value).toBe('abc');
    });

    it('should value changed if set value', async () => {
      spyOn(spectator.component.valueChange, 'emit');
      spectator.component.control.valueChanges.subscribe(() => {
        expect(spectator.component.onChangeEvent).toBeCalledTimes(1);
        expect(spectator.component.valueChange.emit).toBeCalledTimes(1);
        expect(spectator.component.checkedChange.emit).toBeCalledTimes(1);
      });
      spectator.component.control.setValue('qwe');
    });
  });
});

