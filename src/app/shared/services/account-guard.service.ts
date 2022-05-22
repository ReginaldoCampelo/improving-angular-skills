import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterComponent } from 'src/app/account/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class AccountGuardService implements CanDeactivate<RegisterComponent> {

  canDeactivate(component: RegisterComponent) {
    if (component.unsavedChanges) {
      return window.confirm('Tem certeza que deseja sair sem salvar as alterações?');
    }
    return true;
  }
}
