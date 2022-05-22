import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AccountAppComponent } from "./account.app.component";
import { AccountGuardService } from "../shared/services/account-guard.service";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const accountRouterConfig: Routes = [
    {
        path: '', component: AccountAppComponent,
        children: [
            { path: 'register', component: RegisterComponent, canActivate: [AccountGuardService] ,canDeactivate: [AccountGuardService] },
            { path: 'login', component: LoginComponent, canActivate: [AccountGuardService] }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(accountRouterConfig)
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRouteModule { }