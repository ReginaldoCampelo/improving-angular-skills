import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

import { BaseService } from 'src/app/shared/services/base.service';
import { Provider } from '../models/provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends BaseService {

  provider: Provider = new Provider();

  constructor(private http: HttpClient) {
    super();

    this.provider.nome = "Teste fake"
    this.provider.documento = "123456789"
    this.provider.ativo = true
    this.provider.tipoFornecedor = 1
  }

  getAll(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.UrlServiceV1 + "fornecedores")
      .pipe(catchError(super.serviceError));
  }

  getById(id: string): Observable<Provider> {
    return new Observable<Provider>();
  }

  insertProvider(provider: Provider): Observable<Provider> {
    return new Observable<Provider>();
  }

  updateProvider(provider: Provider): Observable<Provider> {
    return new Observable<Provider>();
  }

  deleteProvider(id: string): Observable<Provider> {
    return new Observable<Provider>();
  }
}
