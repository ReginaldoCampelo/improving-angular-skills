import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';

import { LocalStorageUtils } from 'src/app/utils/localstorage';

import { RegisterComponent } from 'src/app/account/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class AccountGuardService implements CanDeactivate<RegisterComponent>, CanActivate {

  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  canDeactivate(component: RegisterComponent) {
    if (component.unsavedChanges) {
      return window.confirm('Tem certeza que deseja sair sem salvar as alterações?');
    }
    return true;
  }

  canActivate() {
    if(this.localStorageUtils.obterTokenUsuario()) {
      this.router.navigate(['/home']);
    }

    return true;
  }
}
