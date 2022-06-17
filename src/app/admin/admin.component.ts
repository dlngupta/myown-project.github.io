import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})

export class AdminComponent implements OnInit {

  headerText:string="Admin";
  constructor(private router:Router,private sharedService:SharedService) { }
  userList:any=[];
  ngOnInit(): void {
    this.getUserList()
  }
  logout(){
    this.router.navigate(['/login']);
  }
  getUserList(){
    this.sharedService.getUserList().subscribe(data=>{
      if(data){
        this.userList=data;
      }
    })
  }
  switchToDashBoard(){
    // this.sharedService.updateIsUserLoggedin(true);
    this.router.navigate(['/dashboard']);
  }
  
}
