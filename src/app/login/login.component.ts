import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private sharedService:SharedService,private router:Router) { 
    this.sharedService.updateIsUserLoggedin(false);
  }
  loginModel:any={};
  model:any={};

  ngOnInit(): void {
  }
  emailMesaage:string="";
  passwordMessage:string="";
  loginUser(data:any){
    this.emailMesaage=this.passwordMessage="";
    if(data){
      this.sharedService.getUserList().subscribe(
        userList=>{
        const emailcheck=userList.find((val:any)=>{
            return val.email.toLowerCase()===data.userName.toLowerCase() 
        })
        const passwordCheck=userList.find((val:any)=>{
          return val.password.toLowerCase()===data.password.toLowerCase()
      })
         if(!emailcheck) {
          this.emailMesaage="Email incorrect";
          return;
          
         }
         if(!passwordCheck) {
          this.passwordMessage="Password incorrect";
          
         }
        if(emailcheck && passwordCheck){
          alert("User Loggged in Success fully");
          this.sharedService.updateIsUserLoggedin(true);
          this.router.navigate(['/dashboard']);
         
        }
      
      },
      (err)=>{
        console.log(err);
        this.sharedService.updateIsUserLoggedin(false);
        this.emailMesaage=this.passwordMessage="";
      })
    }
  }
  onSubmit(){

  }

}
