import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Author, Authors, DataAuthor, DataGenre, DataManga, Genre,AuthorDto} from '../types';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthorService {

    url="/api/authors";
    urlDataAuthor ="/api/authors/author"
    urlDto ="/api/authors/dto"
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

    authorsDto = new BehaviorSubject<AuthorDto[]>([])
    currentAuthorDTO = this.authorsDto.asObservable();


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




  /*  addAuthor(authorDto: Omit<AuthorDto, "img"| "id" >) {
        this.http.post<AuthorDto>(this.url, authorDto)
            .subscribe((r) => {
                this.authorsDto.next([...this.authorsDto.getValue(), r]);
            })
    }*/

    addAuthor(authorDto: Omit<AuthorDto, "img"| "id" >) {
        console.log('Adding author:', authorDto); // Vérifiez les données envoyées ici
        this.http.post<AuthorDto>(`${this.url}`, authorDto, {
            headers: this.options.headers
        }).subscribe({
            next: (r) => {
                console.log('Author added successfully:', r);
                this.authorsDto.next([...this.authorsDto.getValue(), r]);
            },
            error: (err) => {
                console.error('Error adding author:', err);
            }
        });
    }





    removeAuthor(id: number){
        this.http.delete<Author>(`${this.url}/${id}`)
            .subscribe(()=>{
                this.authorsAction.next(this.authorsAction.getValue().filter(author =>author.id !== id))
            })
    }

    updateAuthor(authorDto: AuthorDto): Observable<AuthorDto> {
        const url = `${this.url}/${authorDto.id}`;
        return this.http.put<AuthorDto>(url, authorDto);
    }


  getAuhtorDto(){
      this.http.get<AuthorDto[]>(this.urlDto, {
          headers: this.options.headers
      })
          .pipe()
          .toPromise()
          .then((r)=>{
              if(!r) return;
              this.authorsDto.next(r);
          })
  }

}