import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { EventInputTarget } from '../../types';

let nextId = 0;

@Component({
  selector: 'hackfest-checkbox-item',
  styleUrls: ['../checkbox.component.scss'],
  templateUrl: './checkbox-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HackfestCheckboxItemComponent {
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
  private _id = `hackfest-checkbox-item-${nextId++}`;

  @Input()
  public set value(value: any) {
    this._value = value;
  }
  public get value() {
    return this._value;
  }
  private _value: any;

  @Output()
  checkboxChange = new EventEmitter<HTMLInputElement>();

  onChangeEvent({ target }: EventInputTarget) {
    this.checkboxChange.emit(target);
  }
}
