import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Author, Authors, DataAuthor, DataGenre, DataManga, Genre} from '../types';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthorService {

    url="/api/authors";
    urlDataAuthor ="/api/authors/author"
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
    authorsAction = new BehaviorSubject<Author[]>( []);
    authors = new BehaviorSubject<Authors| null>(null);
    currentAuthorsAction = this.authorsAction.asObservable();
    currentAuthors = this.authors.asObservable();
    dataAuthor  = new BehaviorSubject<DataAuthor | null>(null);
    currentDataAuthor = this.dataAuthor.asObservable();

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Récupère toute les autheur
     *
     */
    getAuthors(page: number=0){
        this.http.get<Authors>(`${this.url}?page=${page}`)
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




    addAuthor(author: Omit<Author, "img"| "id" >) {
        this.http.post<Author>(this.url, author)
            .subscribe((r) => {
                this.authorsAction.next([...this.authorsAction.getValue(), r]);
            })
    }

    removeAuthor(id: number){
        this.http.delete<Author>(`${this.url}/${id}`)
            .subscribe(()=>{
                this.authorsAction.next(this.authorsAction.getValue().filter(author =>author.id !== id))
            })
    }

    updateAuthor(author: Author): Observable<Author> {
        const url = `${this.url}/${author.id}`;
        return this.http.put<Author>(url, author);
    }




}