import { FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-errors',
  templateUrl: './message-errors.component.html',
  styleUrls: ['./message-errors.component.scss'],
})
export class MessageErrorsComponent implements OnInit {
  @Input() public control!: AbstractControl | null;

  constructor() {}

  ngOnInit(): void {}
}
