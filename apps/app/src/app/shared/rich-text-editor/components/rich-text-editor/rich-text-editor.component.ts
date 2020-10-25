import { Component, Input, AfterViewInit, ChangeDetectorRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'csm-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RichTextEditorComponent,
    multi: true,
  }]
})
export class RichTextEditorComponent implements ControlValueAccessor, AfterViewInit {
  private _value: string;

  public control: FormControl;

  constructor(
    private injector: Injector,
    private cdr: ChangeDetectorRef) { }

  @Input() label: string;

  public get value(): string {
    return this._value;
  }
  @Input()
  public set value(value: string) {
    if (this._value === value) {
      return;
    }

    this._value = value;
  }

  public ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get<NgControl>(NgControl);
    if (ngControl) {
      this.control = ngControl.control as FormControl;
      this.cdr.detectChanges();
    }
  }

  public writeValue(obj: any): void {
    this.value = obj;
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  public setDisabledState?(isDisabled: boolean): void { }

  public onContentChanged(): void {
    if (this.value === this.control.value) {
      return;
    }

    this.value = this.control.value;
    this.propagateTouch(null);
    this.propagateChange(this.value);
  }

  private propagateChange = (_: string) => {};
  private propagateTouch = (_: string) => {};
}
