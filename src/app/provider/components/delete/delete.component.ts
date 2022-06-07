import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Provider } from '../../shared/models/provider';
import { ProviderService } from '../../shared/service/provider.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  provider: Provider = new Provider();

  constructor(private providerService: ProviderService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    
    this.providerService.getById(route.params['id'])
    .subscribe(provider => this.provider = provider);
  }

  deleteEvent() {
    this.providerService.deleteProvider(this.provider.id)
    .subscribe(
      event => { this.actionForSuccess(event) },
      error => { this.actionForFail() }
    );
  }

  actionForSuccess(event: any) {
    const toast = this.toastr.success('Fornecedor excluído com sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/providers/find/all']);
      })
    }
  }

  actionForFail() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
