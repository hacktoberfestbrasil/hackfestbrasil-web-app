import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  forwardRef,
  Output,
  EventEmitter,
  Optional,
  Self,
  Input,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Injectable,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormArray,
  ControlContainer,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { HackfestControlAccessor } from '../../abstractions';
import { HackfestCheckboxItemComponent } from '../checkbox-item';

let nextId = 0;

@Injectable()
export class HackfestCheckboxGroup extends HackfestControlAccessor {
  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;
  }
}

const HackfestCheckboxGroupProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => HackfestCheckboxGroup),
  multi: true,
};

@Component({
  selector: 'hackfest-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HackfestCheckboxGroup, HackfestCheckboxGroupProvider],
})
export class HackfestCheckboxGroupComponent extends HackfestCheckboxGroup
  implements AfterContentInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject<void>();

  @ViewChild('group', { static: true }) _el: ElementRef<HTMLDivElement>;
  get el() {
    return this._el.nativeElement;
  }

  @ContentChildren(HackfestCheckboxItemComponent) checkboxItems!: QueryList<
    HackfestCheckboxItemComponent
  >;

  @Input()
  public set id(value: string) {
    this._id = value;
  }
  public get id(): string {
    return this._id;
  }
  private _id = `hackfest-checkbox-${nextId++}`;

  @Input()
  public set value(value: any) {
    this._value = value;
  }
  public get value() {
    return this._value;
  }

  @Input()
  public set formArrayName(value: any) {
    this._formArrayName = value;
  }
  public get formArrayName(): any {
    return this._formArrayName;
  }
  private _formArrayName: any;

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter<any>();

  control: AbstractControl;

  get checkboxFormArray() {
    return this.control as FormArray;
  }

  constructor(@Optional() @Self() public ngControl: ControlContainer) {
    super();
  }

  ngAfterContentInit(): void {
    this.control = this.ngControl?.control
      ? this.ngControl.control
      : new FormArray([]);

    this.checkboxItems?.map((checkbox) => {
      checkbox.checkboxChange
        .pipe(takeUntil(this.destroy$))
        .subscribe((target) => this.checkCheckboxes(target));
    });
  }

  checkCheckboxes({ checked, value }: HTMLInputElement) {
    if (checked) {
      this.checkboxFormArray.push(new FormControl(value));
    } else {
      this.checkboxFormArray.controls.forEach((ctrl, i) => {
        if (ctrl.value === value) {
          return this.checkboxFormArray.removeAt(i);
        }
      });
    }
    this.control.updateValueAndValidity();
  }

  ngAfterViewInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.onChange(value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
