import { Client, Genre as GenreClient } from './../models/client.model';
import { cpf } from 'cpf-cnpj-validator';
import { ClientService } from './../service/client.service';
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
  public id: string;
  public isLoading = false;
  public validations: ValidationErrors = {};

  constructor(
    private service: ClientService,
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
      // codigo abaixo comentado refere a esse cara aqui, seria mais forma mt mais compacta
      this.otherGenre = value === GenreClient.OTHERS;

      if (this.otherGenre) {
        this.form.controls['otherGenre'].setValidators(Validators.required);
      } else {
        this.form.controls['otherGenre'].clearValidators();
      }

      // const isOthers = (value: any) => {
      //   if (value === 'others') {
      //     return true;
      //   }
      //   return value === 'others';
      // };
      // this.otherGenre = false;
      // this.otherGenre = isOthers(value);
      // if (isOthers(value)) {
      //   this.otherGenre = true;
      // }
    });

    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      const existId = this.service.getById(this.id);

      if (!existId) {
        this.router.navigate(['/not-found']);
        return;
      }

      this.form.get('genre')?.valueChanges.subscribe((value) => {
        this.otherGenre = value === GenreClient.OTHERS;
        if (!this.otherGenre) {
          this.form.patchValue({ otherGenre: '' });
        }
      });

      this.form.get('cpf')?.disable();
      this.send = false;
      this.item = { ...this.service.getById(this.id) };
      this.form.patchValue(this.item);
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
      console.log(this.form);
      this.form.markAllAsTouched();
      return;
    }
    if (!this.id) {
      this.isLoading = true;
      setTimeout(() => {
        this.service.save(this.form.value);
        this.isLoading = false;
        this.redirectToList();
      }, 2000);
    } else {
      this.isLoading = true;
      setTimeout(() => {
        // getRawValue ira pegar todos os valores do form(tanto enable como disable)
        this.service.edit(this.form.getRawValue());
        this.isLoading = false;
        this.redirectToList();
      }, 2000);
    }
  }

  public onResetForm() {
    this.form.reset();
  }
}
