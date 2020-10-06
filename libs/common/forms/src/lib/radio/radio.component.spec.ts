import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import {
  Spectator,
  SpectatorHost,
  createHostFactory,
  createComponentFactory,
} from '@ngneat/spectator';


import { HackfestRadioComponent } from './radio.component';
import { HackfestRadioOptionComponent } from './radio-option';

const VIEWS = {
  onlyOne: `
    <hackfest-radio [formControl]="form">
      <hackfest-radio-option value="1">1</hackfest-radio-option>
    </hackfest-radio>
  `,
  withOptions: `
    <hackfest-radio [formControl]="form">
      <hackfest-radio-option *ngFor="let c of choices" [value]="c.k">{{ c.v }}</hackfest-radio-option>
    </hackfest-radio>
  `,
  withCustomId: `
    <hackfest-radio-option id="x" value="1">1</hackfest-radio-option>
  `,
};

const OPTIONS = Array.from(['HTML', 'CSS']);

@Component({ selector: 'hackfest-custom-form', template: '' })
class CustomFormComponent {
  form = new FormControl();
  choices = OPTIONS;
}

describe('HackfestRadioComponent', () => {
  describe('Host', () => {
    let spectator: SpectatorHost<HackfestRadioComponent, CustomFormComponent>;
    const createHost = createHostFactory({
      component: HackfestRadioComponent,
      host: CustomFormComponent,
      declarations: [HackfestRadioOptionComponent],
      imports: [ReactiveFormsModule],
    });

    describe('Views', () => {
      it('should display only one option', () => {
        spectator = createHost(VIEWS.onlyOne);
        expect(spectator.query('.hackfest-radio')).toMatchSnapshot();
      });

      it('should display radio with options', () => {
        spectator = createHost(VIEWS.withOptions);
        expect(spectator.query('.hackfest-radio')).toMatchSnapshot();
      });
    });

    describe('Props', () => {
      it('should display only one option', () => {
        spectator = createHost(VIEWS.onlyOne);
        const input = spectator.queryAll('hackfest-radio-option');
        expect(input.length).toEqual(1);
      });

      it('should create an instance with 2 options', () => {
        spectator = createHost(VIEWS.withOptions);
        const input = spectator.queryAll('hackfest-radio-option');
        expect(input.length).toEqual(2);
      });
    });
  });

  describe('Forms', () => {
    let spectator: Spectator<HackfestRadioComponent>;
    const createComponent = createComponentFactory({
      component: HackfestRadioComponent,
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

