import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class PreventManualRoutingGuard implements CanActivate {
  data:boolean;
    constructor(private sharedService:SharedService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    
      this.sharedService.getIsUserLoggedIn().subscribe(data=>{
          this.data=data;
      })
     if(this.data){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false
    }
  }
  
}
