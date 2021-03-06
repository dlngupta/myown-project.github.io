import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  constructor(public fb: FormBuilder,private service:SharedService,
    private router:Router) { }
  submitted: boolean = false;

  ngOnInit(): void {
  }
  registration = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required,Validators.email]],
    phone: ['', [Validators.required,Validators.minLength(10)]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  },
  {
    validator: this.MustMatch('password', 'confirmPassword')
}
  )
  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  regValidationText:string="";
  registerUser() {
    this.submitted = true;
    if(!this.registration.valid){
      //alert("please fill the form details");
      return;
    }
    this.service.getUser('email',this.registration.get('email').value).subscribe(data=>{
      let phone=this.registration.get('phone').value;
      let email=this.registration.get('email').value;
      if(data.filter(d=>d.email==email).length>0){
        this.regValidationText="Email already exists";  
        return;
      }
      // if(data.filter(d=>d.phone==phone).length>0){
      //   this.regValidationText="Phone number already exists";
      //   return;
      // }
     
      this.service.addUser(this.registration.value).subscribe(data=>{
        alert("user added successfully");
        this.registration.reset();
        this.submitted=false;
        this.router.navigate(['/login']);
      });
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
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null : { 'mismatch': true };  
  }
  getUserList(){
    this.service.getUserList().subscribe(data=>{
      console.log(JSON.stringify(data));
      
    })
   
  }
  // getUserById(){
  //     this.service.getUser("my First List").subscribe(data=>{
  //       console.log(JSON.stringify(data));
  //     })
  // }
  

}
