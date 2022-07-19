import { MessageError } from './../../models/registration.model';
import { FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

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
  @Input() public messageError!: MessageError;

  constructor() {}

  ngOnInit(): void {
    this.messageError = { ...defaultMessage, ...this.messageError };
  }
}
