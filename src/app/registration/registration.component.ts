import { Genre, SizeDick } from './../models/registration.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public form: FormGroup;
  public genres: Genre[] = [
    { value: 'masc', viewValue: 'Masculine' },
    { value: 'fem', viewValue: 'Female' },
    { value: 'others', viewValue: 'Others' },
  ];
  public otherGenre = false;
  public error = false;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      otherGenre: new FormControl('', Validators.required),
      sizeDick: new FormControl('', [Validators.required, Validators.max(10)]),
    });
  }

  public ngOnInit(): void {
    this.form.get('genre')?.valueChanges.subscribe((value) => {
      this.otherGenre = value === 'others';
    });

    this.form.valueChanges.subscribe(() => {
      if (!this.form.valid) {
        this.error = true;
      }
    });
  }

  public onSend() {}
}
