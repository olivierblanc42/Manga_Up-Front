import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import {Category, DataUser, Manga, User} from '../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    url="/api/users";
    urlAdmin = "/api/users/admin"

    options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": '*'
        }),
        body: {
          id: '',
        },
    };


    users = new BehaviorSubject<User[]>([]) ;
    currentUsers = this.users.asObservable()
    user = new BehaviorSubject<User | null>(null) ;
    currentUser = this.user.asObservable()

    dataUser=new BehaviorSubject<DataUser | null>(null)
    currentDataUser=this.dataUser.asObservable();

    constructor(private http: HttpClient ) { }

    getUser(id: string | null){
        this.http.get<DataUser>(`${this.url}/${id}`, {headers: this.options.headers})
        .pipe()
        .toPromise()
        .then(r=>{
            if(!r) return;
            console.log("r : ", r);
            this.dataUser.next(r);
        })
    }

    /**
     * Récupère tout les utlisateur
     *
     */
    getUsers(){
        this.http.get<User[]>(`${this.url}`, {headers: this.options.headers})
            .pipe()
            .toPromise()
            .then(r=>{
                if(!r) return;
                //console.log("user.service getUser : ", r);
                this.users.next(r);
            })
    }


   addUser(_user: Omit<User,"id"|"img"|"roles">){
        this.http.post<User>(this.url, _user,{ headers: this.options.headers})
       .pipe()
       .toPromise()
       .then((r)=>{
            if(!r) return;
            console.log(r)
            this.user.next(r);
        })
   }



}
