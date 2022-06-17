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
      return false;
    }
  }
  
}
@Injectable({
  providedIn:'root'
})
export class PreventAdminAccess implements CanActivate{
  isAdminAccess:boolean;
  constructor(private sharedService:SharedService,private router:Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
     
    
    this.sharedService.getIsAdminAccess().subscribe(data=>{
      this.isAdminAccess= data;
    });
    // if(this.isAdminAccess){
    //   this.router.navigate(['/admin']);
    //   return true;
    // }
    // else{
    //   this.router.navigate(['/login']);
    //   return false
    // }
    return this.isAdminAccess;
  }
}
