import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Author, DataAuthor, DataGenre, Genre} from '../types';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthorService {

    url="http://localhost:8080/api/authors";
    urlDataAuthor ="http://localhost:8080/api/authors/author"
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

    authors = new BehaviorSubject<Author[]>([]);
    dataAuthor  = new BehaviorSubject<DataAuthor | null>(null);
    currentDataAuthor = this.dataAuthor.asObservable();

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Récupère toute les autheur
     *
     */
    getAuthors(){
        this.http.get<Author[]>(this.url)
            .pipe()
            .toPromise()
            .then((r) =>{
                if(!r) return;
                console.log(r)
                this.authors.next(r);
            })
    }

    /**
     * Récupère un autheur et ses mangas associer.
     * @param id
     */
    getMangaAuthor(id: number, page: number=0){
        this.http.get<DataAuthor>(`${this.urlDataAuthor}/${id}?page=${page}`, {
            headers: this.options.headers
        })
            .pipe()
            .toPromise()
            .then((r)=>{
                if(!r) return;
                console.log(r)
                this.dataAuthor.next(r);
            })
    }


}