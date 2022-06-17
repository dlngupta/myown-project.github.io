import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { PreventAdminAccess, PreventManualRoutingGuard } from "./prevent-manual-routing.guard";
import { NumberOnly } from "./directives/number-only.directive";
import {ButtonModule} from 'primeng/button';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LogoutBarComponent } from './logout-bar/logout-bar.component';
import { ModalModule } from 'ngx-bootstrap/modal';







@NgModule({
    declarations:[LoginComponent,RegisterComponent, DashboardComponent, AdminComponent,NumberOnly, LogoutBarComponent],
    imports:[
        RouterModule.forRoot([
            {path:'login',component:LoginComponent},
            {path:'register',component:RegisterComponent},
            {path:'dashboard',component:DashboardComponent,canActivate:[PreventManualRoutingGuard]},
            {path:'admin',component:AdminComponent},
            {path:'**',component:LoginComponent}    
        ]),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ButtonModule,
        BsDropdownModule,
        ModalModule.forRoot(),        
        
        
        
    ],
    exports:[RouterModule]
})

export class AppRoutingModule{}