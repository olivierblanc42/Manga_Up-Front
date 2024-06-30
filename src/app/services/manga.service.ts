import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Manga } from '../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
    url="http://localhost:8080/api/mangas";
    urlTenManga = "http://localhost:8080/api/mangas/ten";


    headers=new HttpHeaders()
        .set("content-type", "application/json")
        .set("Access-Control-Allow-Origin", '*');


    mangas=new BehaviorSubject<Manga[]>([]);
    manga=new BehaviorSubject<Manga | null>(null);
    
    currentMangas=this.mangas.asObservable();
    currentManga=this.manga.asObservable();


    constructor(
        private http: HttpClient, 
    ) {
        this.http.get<Manga[]>(this.url)
        .pipe()
        .toPromise()
        .then((r) => {
          if (!r) return;
          this.mangas.next(r);
        })
    }

    /**
     * Récupère 10 mangas
     *
     */
   getTenManga(){
       this.http.get<Manga[]>(this.urlTenManga)
           .pipe()
           .toPromise()
           .then((r) => {
               if (!r) return;
               this.mangas.next(r);
           })

    }

    /**
     * Récupère le Manga.
     * @param id 
     */
    getManga(id: string){
        this.http.get<Manga>(`${this.url}/${id}`, {
            headers: {'Access-Control-Allow-Origin': '*'}
         })
        .pipe()
        .toPromise()
        .then((r)=>{
            if(!r) return;
            this.manga.next(r);
        })
    }
}
