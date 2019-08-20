import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  forwardRef
} from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { Item } from '../models/item.model';
import { tap, delay, skipWhile } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  public show: boolean;
  public items: Item[];
  private itemsSubscription: Subscription;
  public blur: Subject<void>;
  private blurSubscription: Subscription;
  public value: string;
  public isDisabled: boolean;

  @Input() items$: Observable<Item[]>;
  @Input() placeholder: string;
  @Input() status: string;
  @Output() selectionChange: EventEmitter<Item>;

  constructor() {
    this.show = false;
    this.blur = new Subject();
    this.selectionChange = new EventEmitter();
  }

  ngOnInit() {
    this.itemsSubscription = this.items$
      .pipe(tap(_ => (this.show = true)))
      .subscribe(items => (this.items = items));
    this.blurSubscription = this.blur
      .asObservable()
      .pipe(
        delay(350),
        skipWhile(_ => !this.show)
      )
      .subscribe(_ => (this.show = false));
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
    this.blurSubscription.unsubscribe();
  }

  public valueSelected(item: Item) {
    this.selectionChange.emit(item);
    this.show = false;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  onInput() {
    this.onChange(this.value);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
