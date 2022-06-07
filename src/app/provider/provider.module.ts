import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderService } from './shared/service/provider.service';

import { NewComponent } from './components/new/new.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteComponent } from './components/delete/delete.component';
import { DetailComponent } from './components/detail/detail.component';
import { ProviderAppComponent } from './provider.app.component';




@NgModule({
  declarations: [
    ProviderAppComponent,
    NewComponent,
    ListComponent,
    EditComponent,
    DeleteComponent,
    DetailComponent,
    ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    NewComponent,
    ListComponent,
    EditComponent,
    DeleteComponent,
    DetailComponent,
  ],
  providers: [
    ProviderService
  ]
})
export class ProviderModule { }
