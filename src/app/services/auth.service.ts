import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../types';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = 'http://localhost:8080/swagger-ui/index.html';
    private authenticated: boolean = false;

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<User> {
        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(username + ':' + password)
        });

        return this.http.get<User>(this.authUrl, { headers, withCredentials: true }).pipe(
            tap((user: User) => {
                this.authenticated = true;
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
