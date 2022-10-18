import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule} from '@angular/forms'
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit{
  public  signupForm !: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      password:[''],
      mobile:[''],
      department:['']


    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/posts",this.signupForm.value)
      .subscribe(res=>{
        alert("Signup Successfull");
        this.signupForm.reset();
        this.router.navigate(['login']);
      },err=> {
        alert("Something Wrong")
      })
  }

}
