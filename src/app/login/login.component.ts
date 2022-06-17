import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private sharedService:SharedService,private router:Router,private fb:FormBuilder,
    private modalService: BsModalService) { 
    this.sharedService.updateIsUserLoggedin(false);
    this.sharedService.updateIsAdmin(false);
  }
  passwordChange=this.fb.group({
    email:["",[Validators.required,Validators.email]],
    newPwd:["",Validators.required],
    confirmPwd:["",Validators.required],
    
  },
  {
    validator: this.MustMatch('newPwd', 'confirmPwd')
});
  submitted: boolean = false;
  loginModel:any={};
  model:any={};
  modalRef?: BsModalRef;
  
  ngOnInit(): void {
  }
  emailMesaage:string="";
  passwordMessage:string="";
  openModal(template: TemplateRef<any>) {
    this.submitted=false;
    this.errorChnagePassword="";
    this.passwordChange.reset();
    this.modalRef = this.modalService.show(template);
  };
  errorChnagePassword:string="";
  changePassword(){
    this.submitted=true;
    if(!this.passwordChange.valid){
        return;
    };
    this.sharedService.getUser("email",this.passwordChange.get('email').value).subscribe(res=>{
      let results=res[0];

      if(results && results.password==this.passwordChange.get('newPwd').value){
        this.errorChnagePassword="Password is matched with current . Please use different";
        return;
      }
      
      if(results){
        results.password=this.passwordChange.get('newPwd').value;
        results.confirmPassword=this.passwordChange.get('confirmPwd').value;
        this.sharedService.updateUser(results).subscribe(res=>{
          let updatedData:any=res;
          if(updatedData){
            alert("Password changes successfully");
            this.modalService.hide();
            this.passwordChange.reset();
          }
        })
      }
      else{
        this.errorChnagePassword="Email does not exists";
      }
      
    })

    
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
  loginUser(data:any){
    this.emailMesaage=this.passwordMessage="";
    if(data){
      this.sharedService.getUserList().subscribe(
        userList=>{
          
        const emailcheck=userList.find((val:any)=>{
            return val.email.toLowerCase()===data.userName.toLowerCase();
        })
        const passwordCheck=userList.find((val:any)=>{
          return val.password.toLowerCase()===data.password.toLowerCase();
      })
      let tempUsers=userList.filter(user=>user.email==data.userName);
     if(tempUsers.length>0){
      localStorage.setItem("UserName",tempUsers[0].firstName+","+tempUsers[0].lastName);
     }
       
      
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
          if(data.userName=="admin@gmail.com" && data.password=="12345"){
            this.sharedService.updateIsAdmin(true);
            this.router.navigate(['/admin'])
           
            return;
          }
         
          this.router.navigate(['/dashboard']);
         
        }
      
      },
      (err)=>{
        console.log(err);
        this.sharedService.updateIsUserLoggedin(false);
        this.sharedService.updateIsAdmin(false);
        this.emailMesaage=this.passwordMessage="";
      })
    }
  }
  onSubmit(){

  }

}
