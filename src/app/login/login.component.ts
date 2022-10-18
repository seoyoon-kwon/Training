import {Component, OnInit} from "@angular/core";
import {Form, FormBuilder, FormGroup} from '@angular/forms'
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ApiService} from "../shared/api.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  loginSuccess : boolean= true;


  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private api: ApiService) {
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],

    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/posts")
      .subscribe(res => {
        console.log(res);
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        console.log(user);
        if (user) {
          alert("Login Success");
          this.loginForm.reset();
          this.router.navigate(['account'])
        } else {
          alert("user not found")
        }
      }, err => {
        alert("Something Wrong")
      })
  }

}
