import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manga } from '../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchMangaService {

    headers=new HttpHeaders({
        "Content-Type": "application/json",
        "Accept":"application/json",
        "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE",
        "Access-Control-Allow-Origin": '*'
    })

    url="http://localhost:8080/api/mangas/search"
    search=new BehaviorSubject<Manga[]>([]);
    currentSearch=this.search.asObservable();

    
    constructor(private http: HttpClient) { }

    searchManga(manga: string){
        this.http.get<Manga[]>(`${this.url}?name=${manga}`, {
            headers: this.headers
        })
        .pipe()
        .toPromise()
        .then(r=>{
            if(!r) return;
            this.search.next(r);
        })
    }
}
