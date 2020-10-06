import { ControlValueAccessor } from '@angular/forms';

export class HackfestControlAccessor implements ControlValueAccessor {
  protected _disabled: boolean;
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  public _value: any;
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    this._value = value;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
