import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DataManga, Manga } from '../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
    url="http://localhost:8080/api/mangas";
    urlLike=`${this.url}/like`;
    urlTenManga = "http://localhost:8080/api/mangas/ten";


    httpOptions = {
        headers: new HttpHeaders()
            .set("content-type", "application/json")
            .set("Access-Control-Allow-Origin", '*')
    }
    
    mangas=new BehaviorSubject<Manga[]>([]);
    dataManga=new BehaviorSubject<DataManga | null>(null);
    
    currentMangas=this.mangas.asObservable();
    currentDataManga=this.dataManga.asObservable();


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
    getManga(id: string){
        this.http.get<DataManga>(`${this.url}/${id}`, {
            headers: {'Access-Control-Allow-Origin': '*'}
         })
        .pipe()
        .toPromise()
        .then((r)=>{
            if(!r) return;
            console.log("mangaService : ", r);            
            this.dataManga.next(r);
        })
    }

    /**
     * Ajoute le manga en favoris pour l'utilisateur.
     * @param idManga 
     * @param idUser 
     */
    addUserInFavorite(idManga: string, idUser: number | undefined){
        console.log("addUserInFavorite");
        this.http.post<DataManga>(`${this.url}/${idManga}`, {
            headers: {'Access-Control-Allow-Origin': '*'}, idUser})
        .subscribe((r) => {
            this.dataManga.next(r); // -> Je dois récupérer un user pour changer en favorite
        });
     }

    /**
     * Supprime le manga en favoris pour l'utilisateur.
     * @param idManga 
     * @param idUser 
     */ 
    deleteUserAsFavorite(idManga: string, idUser: number | undefined){
        //console.log("deleteUserAsFavorite");
        //this.http.delete<DataManga>(`${this.url}/${idManga}`, {headers:this.httpOptions, body: idUser})
        //.subscribe((r) => {
        //    this.dataManga.next(r); // -> Je dois renvoyer un user pour changer en non favoris
        //})
    }
}
