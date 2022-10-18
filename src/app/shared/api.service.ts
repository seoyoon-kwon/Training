import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(private http: HttpClient) { }


  postAccount(data: any){
    return this.http.post<any>("http://localhost:3000/posts", data)
      .pipe(map((res:any)=>{
        return res;
    }))
  }
  getAccount(){
    return this.http.get<any>("http://localhost:3000/posts")
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  // getSUAccount(){
  //   return this.http.get<any>("http://localhost:3000/signupUsers")
  //     .pipe(map((res:any)=>{
  //       return res;
  //     }))
  // }


  updateAccount(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/posts/"+id, data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  deleteAccount(id: number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  // deleteUsAccount(id: number){
  //   return this.http.delete<any>("http://localhost:3000/signupUsers/"+id)
  //     .pipe(map((res:any)=>{
  //       return res;
  //     }))
  // }

}
