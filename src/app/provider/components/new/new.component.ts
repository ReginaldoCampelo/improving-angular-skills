import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';

import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Provider } from '../../shared/models/provider';
import { ProviderService } from '../../shared/service/provider.service';
import { CepConsulta } from '../../shared/models/address';
import { StringUtils } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  providerForm: FormGroup;
  provider: Provider = new Provider();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  documentText: string;

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
        cnpj: 'CNPJ em formato inválido'
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
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido'
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

      endereco: this.fb.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]]
      })
    });

    this.providerForm.patchValue({ tipoFornecedor: '1', ativo: true });
  }

  ngAfterViewInit(): void {

    this.providerTypeForm().valueChanges
      .subscribe(() => {
        this.changeDocumentValidation();
        this.configureValidationElements();
        this.validateForm();
      });

    this.configureValidationElements();
  }

  configureValidationElements() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validateForm();
    });
  }

  validateForm() {
    this.displayMessage = this.genericValidator.processarMensagens(this.providerForm);
    this.unsavedChanges = true;
  }

  changeDocumentValidation() {
    if (this.providerTypeForm().value === "1") {
      this.document().clearValidators();
      this.document().setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.documentText = "CPF (requerido)";
    }
    else {
      this.document().clearValidators();
      this.document().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.documentText = "CNPJ (requerido)";
    }
  }

  providerTypeForm(): AbstractControl {
    return this.providerForm.get('tipoFornecedor');
  }

  document(): AbstractControl {
    return this.providerForm.get('documento');
  }

  buscarCep(cep: string) {
    
    cep = StringUtils.somenteNumeros(cep);
    if(cep.length < 8) return;

    this.providerService.consultarCep(cep).subscribe(
      cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
      erro => this.errors.push(erro));
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {

    this.providerForm.patchValue({
      endereco: {
        logradouro: cepConsulta.logradouro,
        bairro: cepConsulta.bairro,
        cep: cepConsulta.cep,
        cidade: cepConsulta.localidade,
        estado: cepConsulta.uf
      }
  })
}

  insertProvider() {
    if (this.providerForm.dirty && this.providerForm.valid) {

      this.provider = Object.assign({}, this.provider, this.providerForm.value);
      this.formResult = JSON.stringify(this.provider);

      this.provider.endereco.cep = StringUtils.somenteNumeros(this.provider.endereco.cep);
      this.provider.documento = StringUtils.somenteNumeros(this.provider.documento);

      // forçando o tipo fornecedor ser serializado como INT
      this.provider.tipoFornecedor = parseInt(this.provider.tipoFornecedor.toString());

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
