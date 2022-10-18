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
  public  singupForm !: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    this.singupForm = this.formBuilder.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      password:[''],
      mobile:[''],
      department:['']


    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/posts",this.singupForm.value)
      .subscribe(res=>{
        alert("Signup Successfull");
        this.singupForm.reset();
        this.router.navigate(['login']);
      },err=> {
        alert("Something Wrong")
      })
  }

}
