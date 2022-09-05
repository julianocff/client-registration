import { of } from 'rxjs';
import { Client, Genre as GenreClient } from './../models/client.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { cpf } from 'cpf-cnpj-validator';
import { ClientService } from './../service/client.service';
import { Inject, Injectable, Injector } from '@angular/core';
import {
  Genre,
  height,
  MessagesRegistrationSend,
  MessagesRegistrationSave,
} from './../models/registration.model';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
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
  public send = true;
  public id: string;
  public isLoading = false;
  public validations: ValidationErrors = {};

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = new FormGroup({
      cpf: new FormControl('', [Validators.required, this.cpfValidator()]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-z]* [A-z].*'),
      ]),
      age: new FormControl('', [Validators.required, Validators.max(100)]),
      genre: new FormControl('', Validators.required),
      otherGenre: new FormControl(''),
      height: new FormControl('', [Validators.required]),
    });
    this.id = '';
  }

  public ngOnInit(): void {
    this.form.get('genre')?.valueChanges.subscribe((value) => {
      this.otherGenre = value === GenreClient.OTHERS;

      if (this.otherGenre) {
        this.form.controls['otherGenre'].setValidators(Validators.required);
      } else {
        this.form.controls['otherGenre'].clearValidators();
      }
    });

    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.service.getById(this.id).subscribe();

      this.service.getById(this.id).subscribe((response) => {
        if (!response) this.router.navigate(['/not-found']);
      });

      this.form.get('genre')?.valueChanges.subscribe((value) => {
        this.otherGenre = value === GenreClient.OTHERS;
        if (!this.otherGenre) {
          this.form.patchValue({ otherGenre: '' });
        }
      });

      this.form.get('cpf')?.disable();
      this.send = false;
      this.service.getById(this.id).subscribe((response) => {
        this.item = response;
        this.form.patchValue(this.item);
      });
    }

    this.validations = {
      invalidCpf: 'Invalid CPF',
    };
  }

  public cpfValidator() {
    return (control: AbstractControl) => {
      const inputCpf = control.value;
      if (!inputCpf) return null;

      const isValid = cpf.isValid(inputCpf);
      if (!isValid) {
        return { invalidCpf: true };
      }
      return null;
    };
  }

  public redirectToList() {
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
      return;
    }
    if (!this.id) {
      this.isLoading = true;
      const payload: Client = { ...this.form.value };
      const payloadStream = of(payload);
      payloadStream
        .pipe(
          map((value) => {
            return { ...value };
          }),
          switchMap((value) => {
            return this.service.save(value);
          }),
          tap(() => {
            this.isLoading = false;
          })
        )
        .subscribe((value) => {
          this.redirectToList();
        });
    } else {
      this.isLoading = true;
      this.service.edit(this.form.getRawValue()).subscribe(() => {
        this.isLoading = false;
        this.redirectToList();
      });
    }
  }

  public onResetForm() {
    this.form.reset();
  }

  private get service() {
    return this.injector.get(ClientService);
  }
}
