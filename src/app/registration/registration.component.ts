import { Client } from './../models/client.model';
import { ClientService } from './../service/client.service';
import {
  Genre,
  height,
  MessagesRegistrationSend,
  MessagesRegistrationSave,
} from './../models/registration.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public item = {};
  public listItems = this.service.getList();
  public send = true;
  public isLoading = false;

  constructor(
    private service: ClientService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = new FormGroup({
      cpf: new FormControl('', Validators.required),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-z]* [A-z].*'),
      ]),
      age: new FormControl('', [Validators.required, Validators.max(100)]),
      genre: new FormControl('', Validators.required),
      otherGenre: new FormControl(''),
      height: new FormControl('', [Validators.required]),
    });
  }

  public ngOnInit(): void {
    this.form.get('genre')?.valueChanges.subscribe((value) => {
      // this.otherGenre = value === 'others';
      value === 'others' ? (this.otherGenre = true) : (this.otherGenre = false);
    });

    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      const existId = this.listItems.some((item) => item.cpf === id);

      if (!existId) {
        this.router.navigate(['/not-found']);
      }
      this.form.get('cpf')?.disable();
      this.send = false;
      this.item = { ...this.service.getById(id) };

      this.form.get('genre')?.valueChanges.subscribe((value) => {
        if (value === 'others') {
          this.form.controls['otherGenre'].setValidators(Validators.required);
        }
      });
      this.form.patchValue(this.item);
    }
  }

  private redirectToList() {
    if (this.send) {
      const snackBarRefSend = this.snackBar.open(
        MessagesRegistrationSend.SUCCESSFULLY,
        MessagesRegistrationSend.BACK_LIST
      );
      snackBarRefSend.afterDismissed().subscribe(() => {
        this.router.navigate(['/list']);
      });
    } else {
      const snackBarRefSave = this.snackBar.open(
        MessagesRegistrationSave.SUCCESSFULLY,
        MessagesRegistrationSend.BACK_LIST
      );
      snackBarRefSave.afterDismissed().subscribe(() => {
        this.router.navigate(['/list']);
      });
    }
  }

  public onSend() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      if (Object.values(this.item).length === 0) {
        this.isLoading = true;
        setTimeout(() => {
          this.service.save(this.form.value);
          this.isLoading = false;
          this.redirectToList();
        }, 2000);
      } else {
        this.isLoading = true;
        setTimeout(() => {
          this.form.get('cpf')?.enable();
          this.service.edit(this.form.value);
          this.form.get('cpf')?.disable();
          this.isLoading = false;
          this.redirectToList();
        }, 2000);
      }
    }
  }
}
