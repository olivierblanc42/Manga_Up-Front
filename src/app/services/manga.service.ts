import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Manga } from '../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
    url="http://localhost:8080/api/mangas";
    urlNineManga = "http://localhost:8080/api/mangas/nine";
    urlOneManga = "http://localhost:8080/api/mangas/one";
    urlOrderDate  = "http://localhost:8080/api/mangas/oderDate" ;

    headers=new HttpHeaders()
        .set("content-type", "application/json")
        .set("Access-Control-Allow-Origin", '*');

   // Récupère la requête sql de neuf mangas.
    nineMangas =new BehaviorSubject<Manga[]>([]);
    currentTenMangas = this.nineMangas.asObservable()
  //   Récupère la requête de neuf mangas par ordre de creation du plus recente au plus ancien.
    orderDateManga =new BehaviorSubject<Manga[]>([]);
   currentOrderDateManga = this.orderDateManga.asObservable();

    mangas=new BehaviorSubject<Manga[]>([]);
    manga=new BehaviorSubject<Manga | null>(null);
    currentMangas=this.mangas.asObservable();
    currentManga=this.manga.asObservable();


    constructor(
        private http: HttpClient, 
    ) {

    }

    /**
    * recuprere tout les manga et en garde un seul
    *
    *
     */


    /**
     * Récupère 9 mangas
     *
     */
   getTenManga(){
       this.http.get<Manga[]>(this.urlOrderDate)
           .pipe()
           .toPromise()
           .then((r) => {
               if (!r) return;
               console.log(r)
               this.orderDateManga.next(r);
           })

    }


    /**
     * Récupère 9 mangas par date
     *
     */
    getOrderDateManga(){
        this.http.get<Manga[]>(this.urlNineManga)
            .pipe()
            .toPromise()
            .then((r) => {
                if (!r) return;
                console.log(r)
                this.nineMangas.next(r);
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
