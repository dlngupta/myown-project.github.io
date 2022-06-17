import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  headerText:string="Dashboard";
  constructor(private router:Router,private sharedService:SharedService) { 
    this.sharedService.updateIsUserLoggedin(true);
  }

  ngOnInit(): void {
  }
  logout(){
    this.router.navigate(['/login']);
  }

}
