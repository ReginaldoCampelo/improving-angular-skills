import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { fromEvent, merge, Observable } from 'rxjs';

import { CustomValidators } from 'ng2-validation'
import { ToastrService } from 'ngx-toastr';

import { User } from '../shared/models/user';
import { AccountService } from '../shared/services/account.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  loginForm: FormGroup;
  user: User;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido.'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]]
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.loginForm);
    });
  }

  logIn() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.user = Object.assign({}, this.user, this.loginForm.value);

      this.accountService.login(this.user)
        .subscribe(
          forSuccess => { this.actionForSuccess(forSuccess) },
          forFailure => { this.actionForFailure(forFailure) }
        );
    }
  }

  actionForSuccess(success: any) {
    this.loginForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.salvarDadosLocaisUsuario(success);

    let toast = this.toastr.success('Usuário logado com sucesso!', 'Bem vindo!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  actionForFailure(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Usuário e/ou senha inválidos!', 'Ops! :(');
  }

}
