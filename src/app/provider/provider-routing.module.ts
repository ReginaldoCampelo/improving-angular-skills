import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteComponent } from './components/delete/delete.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { NewComponent } from './components/new/new.component';
import { ProviderAppComponent } from './provider.app.component';

const routes: Routes = [
  {
    path: '', component: ProviderAppComponent,
    children: [
      { path: 'find/all', component: ListComponent },
      { path: 'insert', component: NewComponent },
      { path: 'update/:id', component: EditComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: 'delete/:id', component: DeleteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
