import {
  Self,
  Input,
  Output,
  Optional,
  ViewChild,
  Component,
  Injectable,
  ElementRef,
  forwardRef,
  OnDestroy,
  EventEmitter,
  AfterViewInit,
  AfterContentInit,
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventInputTarget } from './../types';
import {
  AbstractControl,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { HackfestControlAccessor } from '../abstractions';
import { HackfestRadioOptionComponent } from './radio-option';

let nextId = 0;

@Injectable()
export class HackfestRadio extends HackfestControlAccessor {
  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;
  }
  @Input()
  public set value(value: any) {
    this._value = value;
  }
}

const HackfestRadioProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => HackfestRadio),
  multi: true,
};

@Component({
  selector: 'hackfest-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HackfestRadio, HackfestRadioProvider],
})
export class HackfestRadioComponent extends HackfestRadio
  implements AfterContentInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject<void>();

  @ContentChildren(forwardRef(() => HackfestRadioOptionComponent), {
    descendants: true,
  })
  _radios: QueryList<HackfestRadioOptionComponent>;

  @ViewChild('input', { static: true }) _el: ElementRef<HTMLInputElement>;
  get el() {
    return this._el.nativeElement;
  }

  @Input()
  public set id(value: string) {
    this._id = value;
  }
  public get id(): string {
    return this._id;
  }
  private _id = `hackfest-radio-${nextId++}`;

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  checkedChange = new EventEmitter<boolean>(false);

  control: AbstractControl;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super();
  }

  ngAfterContentInit() {
    this.control = this.ngControl?.control
      ? this.ngControl.control
      : new FormControl();
  }
  ngAfterViewInit() {
    this.ngControl?.control?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.valueChange.emit(value));
    this._radios.map((item) => this.onChangeOption(item));
  }
  onChangeOption(option: HackfestRadioOptionComponent) {
    option.name = this.id;
    option.checkedChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ value, el }) => {
        this.control.setValue(value);
        this.checkedChange.emit(el.checked);
        this.valueChange.emit(value);
      });
  }
  onChangeEvent(evt: EventInputTarget) {
    this.onChange(evt.target.value);
    this.checkedChange.emit(evt.target.checked);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
