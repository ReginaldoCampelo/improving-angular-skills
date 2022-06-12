import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';

import { utilsBr } from 'js-brasil';
import { NgBrazilValidators } from 'ng-brazil';
import { ToastrService } from 'ngx-toastr';

import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Provider } from '../../shared/models/provider';
import { ProviderService } from '../../shared/service/provider.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  providerForm: FormGroup;
  provider: Provider = new Provider();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  MASKS = utilsBr.MASKS;
  formResult: string = '';

  unsavedChanges: boolean;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private providerService: ProviderService) {
    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento',
        cpf: 'CPF em formato inválido',
      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP'
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    this.providerForm = this.fb.group({
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required, NgBrazilValidators.cpf]],
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]],

      addressForm: this.fb.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]],
      })
    });

    this.providerForm.patchValue({ tipoFornecedor: '1', ativo: true });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.providerForm);
      this.unsavedChanges = true;
    });
  }

  insertProvider() {
    if (this.providerForm.dirty && this.providerForm.valid) {
      this.provider = Object.assign({}, this.provider, this.providerForm.value);
      this.formResult = JSON.stringify(this.provider);

      this.providerService.insertProvider(this.provider)
      .subscribe(
        success => { this.actioNForSuccess(success) },
        fail => { this.actionForFail(fail) }
      );

      this.unsavedChanges = false;
    }
  }

  actioNForSuccess(response: any) {
    this.providerForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/providers/find/all']);
      });
    }
  }

  actionForFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro ao tentar cadastrar o fornecedor!', 'Erro!');
  }
}
