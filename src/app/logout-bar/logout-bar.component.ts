import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout-bar',
  templateUrl: './logout-bar.component.html',
  styleUrls: ['./logout-bar.component.less']
})
export class LogoutBarComponent implements OnInit {

  constructor() { }
@Input() header:string="";
userName:string="";
  ngOnInit(): void {
    this.userName=localStorage.getItem("UserName");
  }

}
