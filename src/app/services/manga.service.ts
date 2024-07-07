import { DataManga, Manga } from './../types.d';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
    url="http://localhost:8080/api/mangas";
    urlLike=`${this.url}/like`;
    urlTenManga = "http://localhost:8080/api/mangas/ten";

    /**
     * Ajoute des options dans le header et dans le body
     */
    options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": '*'
        }),
        body: {
          id: '',
        },
    };

    mangas=new BehaviorSubject<Manga[]>([]);
    dataManga=new BehaviorSubject<DataManga | null>(null);
    isFavorite=new BehaviorSubject<boolean | null>(null);

    currentMangas=this.mangas.asObservable();
    currentDataManga=this.dataManga.asObservable();
    currentIsFavorite=this.isFavorite.asObservable();

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
     * Récupère un manga.
     * @param id 
     */
    getManga(id: number){
        this.http.get<DataManga>(`${this.url}/${id}`, {
            headers: this.options.headers
         })
        .pipe()
        .toPromise()
        .then((r)=>{
            if(!r) return;
            this.dataManga.next(r);
        })
    }

    /**
     * Ajoute le manga en favoris pour l'utilisateur.
     * @param idManga 
     * @param idUser 
     */
    addUserInFavorite(idManga: number, idUser: number | undefined){
        const data= {
            "id":idUser
        }
        this.http.post<boolean>(`${this.url}/${idManga}`, data, {headers: this.options.headers})
        .subscribe((r) => {
            this.isFavorite.next(true);
        });
     }

    /**
     * Supprime le manga en favoris pour l'utilisateur.
     * @param idManga 
     * @param idUser 
     */ 
    deleteUserAsFavorite(idManga: number, idUser: number | undefined){
        this.options.body.id=String(idUser);
        console.log(this.options);
        
        this.http.delete<boolean>(`${this.url}/${idManga}`, this.options)
        .subscribe((r) => {
            this.isFavorite.next(false);
        })
    }
}
