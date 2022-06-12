import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

import { BaseService } from 'src/app/shared/services/base.service';
import { CepConsulta } from '../models/address';
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
    return this.http.post(this.UrlServiceV1 + "fornecedores", provider, this.GetAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  updateProvider(provider: Provider): Observable<Provider> {
    return new Observable<Provider>();
  }

  deleteProvider(id: string): Observable<Provider> {
    return new Observable<Provider>();
  }

  consultarCep(cep: string): Observable<CepConsulta> {
    return this.http.get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(catchError(super.serviceError));
  }
}
