import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Address } from '../../shared/models/address';
import { Provider } from '../../shared/models/provider';
import { ProviderService } from '../../shared/service/provider.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef}) formInputElements: ElementRef[];

  errors: any[] = [];
  errorsAddress: any[] = [];
  providerForm: FormGroup;
  addressForm: FormGroup;

  provider: Provider = new Provider();
  address: Address = new Address();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  textDocument: string = '';

  typeProvider: number;
  formResult: string = '';

  unsavedChanges: boolean;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private route: ActivatedRoute, private providerService: ProviderService) {
    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento'
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

   this.providerService.getById(route.params['id'])
   .subscribe(provider => this.provider = provider);
  }

  ngOnInit(): void {

    this.providerForm = this.fb.group({
      id: '',
      nome: ['', [Validators.required]],
      documento: '',
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]]
    });

    this.addressForm = this.fb.group({
      id: '',
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      fornecedorId: ''
    });
  }

  ngAfterViewInit() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.providerForm);
      this.unsavedChanges = true;
    });
  }

  updateProvider() {
    if (this.providerForm.dirty && this.providerForm.valid) {

      this.provider = Object.assign({}, this.provider, this.providerForm.value);

      this.providerService.updateProvider(this.provider)
      .subscribe(
        success => { this.actionForSuccess(success) },
        fail => { this.actionForFail(fail) }
      );

      this.unsavedChanges = false;
    }
  }

  actionForSuccess(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Fornecedor atualizado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/providers/find/all']);
      });
    }
  }

  actionForFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro ao atualizar o fornecedor!', 'Erro!');
  }
}
