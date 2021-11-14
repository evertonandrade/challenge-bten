import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConfirmedValidator } from 'src/app/shared/utils/confirmed-validator';
import {
  DisplayMessage,
  GenericValidator,
  ValidationMessages,
} from 'src/app/shared/utils/generic-form-validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, AfterViewInit {
  signupForm: FormGroup;
  user: User;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  errors: any[] = [];
  loading: boolean;

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },
      password: {
        required: 'Informe a senha',
        minLength: 'A senha deve possuir mais de 6 caracteres',
        maxLength: 'A senha deve possuir menos de 15 caracteres',
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        minLength: 'A senha deve possuir mais de 6 caracteres',
        maxLength: 'A senha deve possuir menos de 15 caracteres',
        ConfirmedValidator: 'As senhas não conferem',
      },
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    let email = new FormControl('', [Validators.required, Validators.email]);
    let password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]);
    let confirmPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]);
    this.signupForm = this.fb.group(
      { email, password, confirmPassword },
      { validator: ConfirmedValidator('password', 'confirmPassword') }
    );
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );
    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.proccessMessages(
        this.signupForm
      );
    });
  }

  addAccount() {
    if (this.signupForm?.dirty && this.signupForm.valid) {
      const user = { ...this.user, ...this.signupForm.value };
      this.loading = true;
      this.auth.signUp(user).subscribe(
        (success) => {
          this.processSucces(success);
        },
        (fail) => {
          this.processFailure(fail);
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  processSucces(response: any) {
    this.signupForm.reset();
    this.errors = [];
    this.auth.localStorageUtil.saveLocalUserData(response.data);
    this.router.navigate(['/dashboard']);
  }

  processFailure(response: any) {
    this.errors = response.errors;
  }
}
