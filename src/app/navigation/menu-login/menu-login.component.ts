import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageUtils } from 'src/app/utils/localstorage';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.css']
})
export class MenuLoginComponent implements OnInit {

  token: string = '';
  user: any;
  email: string = '';
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router, private toastr: ToastrService) { }

  userLogged(): boolean {
    this.token = this.localStorageUtils.obterTokenUsuario();
    this.user = this.localStorageUtils.obterUsuario();

    if (this.user)
      this.email = this.user.email;

    return this.token !== null;
  }

  logout(): void {
    this.localStorageUtils.limparDadosLocaisUsuario();
    let toastr = this.toastr.info('Solicitação realizado com sucesso!, ', 'Logout');
    if(toastr) {
      toastr.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  ngOnInit(): void {
  }

}
