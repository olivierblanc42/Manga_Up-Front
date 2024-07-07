import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataUser, User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    url="http://localhost:8080/api/users";

    options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": '*'
        }),
        body: {
          id: '',
        },
    };

    dataUser=new BehaviorSubject<DataUser | null>(null)
    currentDataUser=this.dataUser.asObservable();

    constructor(private http: HttpClient ) { }

    getUser(id: string){
        this.http.get<DataUser>(`${this.url}/${id}`, {headers: this.options.headers})
        .pipe()
        .toPromise()
        .then(r=>{
            if(!r) return;
            console.log("user.service getUser : ", r);            
            this.dataUser.next(r);
        })
    }
}
