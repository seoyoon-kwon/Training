import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import {AccountModel} from "./account.model";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  formValue !: FormGroup;
  accountModelObj: AccountModel = new AccountModel();
  accountData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilder: FormBuilder,
              private api: ApiService) {
  }


  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [''],
      mobile: [''],
      department: ['']
    })
    this.getAllAccount();
  }

  clickAddAccount() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }


  postAccountDetails() {
    this.accountModelObj.firstname = this.formValue.value.firstname;
    this.accountModelObj.lastname = this.formValue.value.lastname;
    this.accountModelObj.email = this.formValue.value.email;
    this.accountModelObj.password = this.formValue.value.password;
    this.accountModelObj.mobile = this.formValue.value.mobile;
    this.accountModelObj.department = this.formValue.value.department;

    this.api.postAccount(this.accountModelObj)
      .subscribe(res => {
          console.log(res);
          alert("Account Added Successful")
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
          this.getAllAccount();
        },
        error => {
          alert("Something Wrong")
        })

  }

  getAllAccount() {
    this.api.getAccount()
      .subscribe(res => {
        this.accountData = res;
      })


  }

  // getSUerAccount() {
  //   this.api.getSUAccount()
  //     .subscribe(res => {
  //       this.accountData = res;
  //     })
  // }




  deleteAccount(row: any) {
    this.api.deleteAccount(row.id)
      .subscribe(res => {
        alert("Account Deleted")
        this.getAllAccount();
      })
  }

  // deleteUserAccount(row: any) {
  //   this.api.deleteUsAccount(row.id)
  //     .subscribe(res => {
  //       alert("Account Deleted")
  //       this.getAllAccount();
  //     })
  // }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.accountModelObj.id = row.id;
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['password'].setValue(row.password);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['department'].setValue(row.department);


  }

  updateAccountDetails() {
    this.accountModelObj.firstname = this.formValue.value.firstname;
    this.accountModelObj.lastname = this.formValue.value.lastname;
    this.accountModelObj.email = this.formValue.value.email;
    this.accountModelObj.password = this.formValue.value.password;
    this.accountModelObj.mobile = this.formValue.value.mobile;
    this.accountModelObj.department = this.formValue.value.department;

    this.api.updateAccount(this.accountModelObj, this.accountModelObj.id)
      .subscribe(res => {
        alert("Update Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllAccount();
      })
  }


}



