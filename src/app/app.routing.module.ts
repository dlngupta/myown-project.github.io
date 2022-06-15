import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { PreventManualRoutingGuard } from "./prevent-manual-routing.guard";



@NgModule({
    declarations:[LoginComponent,RegisterComponent, DashboardComponent, AdminComponent],
    imports:[
        RouterModule.forRoot([
            {path:'login',component:LoginComponent},
            {path:'register',component:RegisterComponent},
            {path:'dashboard',component:DashboardComponent,canActivate:[PreventManualRoutingGuard]},
            {path:'admin',component:AdminComponent,canActivate:[PreventManualRoutingGuard]},
            {path:'**',component:LoginComponent}    
        ]),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        
    ],
    exports:[RouterModule]
})

export class AppRoutingModule{}