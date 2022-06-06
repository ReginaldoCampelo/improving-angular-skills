import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';

import { NewComponent } from './components/new/new.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteComponent } from './components/delete/delete.component';
import { DetailComponent } from './components/detail/detail.component';


@NgModule({
  declarations: [
    NewComponent,
    ListComponent,
    EditComponent,
    DeleteComponent,
    DetailComponent,
    ],
  imports: [
    CommonModule,
    ProviderRoutingModule
  ],
  exports: [
    NewComponent,
    ListComponent,
    EditComponent,
    DeleteComponent,
    DetailComponent,
  ]
})
export class ProviderModule { }
