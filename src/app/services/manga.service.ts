import {DataManga, Manga, Mangas} from './../types.d';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
    url="http://localhost:8080/api/mangas";
    urlLike=`${this.url}/like`;
    urlTenManga = "http://localhost:8080/api/mangas/ten";
    urlNineManga = "http://localhost:8080/api/mangas/nine";
    urlOneManga = "http://localhost:8080/api/mangas/oderOne";
    urlOrderDate  = "http://localhost:8080/api/mangas/oderDate" ;
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

    headers=new HttpHeaders()
        .set("content-type", "application/json")
        .set("Access-Control-Allow-Origin", '*');

    // Récupère la requête sql de neuf mangas.
    nineMangas =new BehaviorSubject<Manga[]>([]);
    currentTenMangas = this.nineMangas.asObservable()
    //   Récupère la requête de neuf mangas par ordre de creation du plus recente au plus ancien.
    orderDateManga =new BehaviorSubject<Manga[]>([]);
    currentOrderDateManga = this.orderDateManga.asObservable();
    // Récupère un seul Manga
    oneManga =  new BehaviorSubject<Manga | null>(null);
    currentMangaOne=this.oneManga.asObservable();

    mangas=new BehaviorSubject<Manga[]>([]);
    dataManga=new BehaviorSubject<DataManga | null>(null);
    isFavorite=new BehaviorSubject<boolean | null>(null);
    manga=new BehaviorSubject<Manga | null>(null);
    //pageComments=new BehaviorSubject<Comment[]>([]);

    currentMangas=this.mangas.asObservable();
    currentManga=this.manga.asObservable();
    currentDataManga=this.dataManga.asObservable();
    currentIsFavorite=this.isFavorite.asObservable();
    //currentPageComments=this.pageComments.asObservable();

    // utilisation de la pagination

    mangaPagination  = new BehaviorSubject<Mangas | null>(null);
    currentMangaPagination = this.mangaPagination.asObservable()

    constructor(
        private http: HttpClient, 
    ) {

    }





    /**
     * Récupère la page des commentaires du manga.
     * @param id L'id du manga.
     * @param page Le numéro de page.
     */
    //getPageComments(idManga: number, page: number){
    //    this.http.get<Comment[]>(`${this.url}/${idManga}?page=${page}`, {
    //        headers: this.options.headers
    //     })
    //     .pipe()
    //     .toPromise()
    //     .then(r=>{
    //        if(!r) return;
    //        this.pageComments.next(r);
    //     })
    //}
//`${this.url}/${id}?page=${page}`
    /**
     * recuprere   tout les mangas
     *
     */
    getMangas( page: number=0){
        this.http.get<Mangas>(`${this.url}?page=${page}`, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe()
            .toPromise()
            .then((r)=>{
                if(!r) return;

                this.mangaPagination.next(r);
            })
    }




    /**
    * recuprere   un seul Manga
    *
    */
    getOneManga(){
        this.http.get<Manga>(this.urlOneManga, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe()
            .toPromise()
            .then((r)=>{
                if(!r) return;
                this.oneManga.next(r);
            })
    }

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
                //console.log(r)
                this.nineMangas.next(r);
            })
    }

    /**
     * Récupère un manga.
     * @param id 
     */
    getManga(id: number, page: number=0){
        this.http.get<DataManga>(`${this.url}/${id}?page=${page}`, {
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
        console.log(`Dans adduserfavorite : ${this.url}/${idManga}`);
        
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
        console.log(`Dans deleteUserAsFavorite : ${this.url}/${idManga}`);
        this.http.delete<boolean>(`${this.url}/${idManga}`, this.options)
        .subscribe((r) => {
            this.isFavorite.next(false);
        })
    }
}