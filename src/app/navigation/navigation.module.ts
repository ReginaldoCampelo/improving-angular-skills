import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuLoginComponent } from './menu-login/menu-login.component';



@NgModule({
  declarations: [
    FooterComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    MenuLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    // shared components
    FooterComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    MenuLoginComponent
  ]
})
export class NavigationModule { }
