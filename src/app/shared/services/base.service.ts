import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { LocalStorageUtils } from "src/app/utils/localstorage";
import { environment } from "src/environments/environment";

export abstract class BaseService {

    public LocalStorage = new LocalStorageUtils();
    protected UrlServiceV1: string = environment.apiUrl;

    protected GetHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected GetAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.LocalStorage.obterTokenUsuario()}`
            })
        };
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];

        if (response instanceof HttpErrorResponse) {
            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro inesperado.");
                response.error.errors = customError;
            }
        }

        console.error(response);
        return throwError(response);
    }
}