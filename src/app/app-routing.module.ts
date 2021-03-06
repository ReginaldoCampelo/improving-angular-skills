import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountModule } from './account/account.module';
import { HomeComponent } from './navigation/home/home.component';
import { NotFoundComponent } from './navigation/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => AccountModule) },
  { path: 'providers', loadChildren: () => import('./provider/provider.module').then(m => m.ProviderModule) },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
