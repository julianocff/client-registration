import { MessageError } from './../../models/registration.model';
import { FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { startWith } from 'rxjs/operators';

const defaultMessage = {
  required: 'Required',
  max: 'Invalid max',
  pattern: 'Invalid pattern',
};

@Component({
  selector: 'app-message-errors',
  templateUrl: './message-errors.component.html',
  styleUrls: ['./message-errors.component.scss'],
})
export class MessageErrorsComponent implements OnInit {
  @Input() public control!: AbstractControl | null;
  @Input() public messageError!: any;

  public error = '';

  constructor() {}

  ngOnInit(): void {
    this.messageError = { ...defaultMessage, ...this.messageError };
    this.control?.statusChanges.pipe(startWith(null)).subscribe((value) => {
      const keys = Object.keys(this.control?.errors || {});
      const errorKey = keys.find((errorKey) => {
        return this.messageError[errorKey];
      });
      this.error = errorKey ? this.messageError[errorKey] : '';
    });
  }
}
