import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../types';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = '/api/users/login';
    private authUrlRegister = '/api/register';
    private authenticated: boolean = false;

    user = new BehaviorSubject<User | null>(null) ;
    currentUser = this.user.asObservable()


    constructor(private http: HttpClient, private accountService: AccountService ) {}

    login(username: string, password: string): Observable<User> {
        
        let options = {
            headers: new HttpHeaders({
                "Authorization": 'Basic ' + btoa(username + ':' + password),
                "Content-Type": "application/json",
                "Accept":"application/json",
                "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE",
                "Access-Control-Allow-Origin": '*'
            })
        };

        // C'est ici qu'on récupère l'utilisateur.
        return this.http.post<User>(this.authUrl, {username, password}, { headers:options.headers, withCredentials: true }).pipe(
            tap((user: User) => {
                this.authenticated = true;
                console.log(user);
                
                this.accountService.setUser(user);
                this.user.next(user);
            })
        );
    }

    register(registerUser: object) {
        let options = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept":"application/json",
                "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE",
                "Access-Control-Allow-Origin": '*'
            })
        };
        let data=JSON.stringify(registerUser);
        console.log("registerUser", data);

        return this.http.post<any>(this.authUrlRegister, data, { headers:options.headers }).pipe(
            tap((user: User) => {
                this.authenticated = true;
                this.accountService.setUser(user)
                console.log("user auth service : ", user)
            })
        );
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    logout(): void {
        this.authenticated = false;
    }
}
