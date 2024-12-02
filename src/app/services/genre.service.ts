import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom, Observable} from 'rxjs';
import {Genre, Genres, DataGenre, Manga, GenreDto, CategoryDto, UpdateGenreDto, MangaDto} from '../types';



@Injectable({
    providedIn: 'root'
})

export class GenreService {
    url="/api/genres";
    urlSixForHome ="/api/genres/six"
    urlMangaInGenre = "/api/genres/genre"
    urlDto= "api/genres/dto";
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


    genres=new BehaviorSubject<Genre[]>([]);
    genre=new BehaviorSubject<Genre | null>(null);

    genresSix =   new BehaviorSubject<Genre[]>([]);
    currentGenresSix = this.genresSix.asObservable();

    currentGenres = this.genres.asObservable();
    currentGenre =this.genre.asObservable();

    //dto
    genresDto = new BehaviorSubject<GenreDto[]>([])
    currentGenreDto = this.genresDto.asObservable();

    genreDto = new BehaviorSubject<GenreDto|null>(null)

    // utilisation de la pagination
    genrePagination = new  BehaviorSubject<Genres | null>(null);
    currentGenrePagination = this.genrePagination.asObservable()
    //pagination manga dans genre
    dataGenre = new  BehaviorSubject<DataGenre | null>(null);
    currentDataGenre = this.dataGenre.asObservable()

    // Pour update
    updateGenreDto = new BehaviorSubject<UpdateGenreDto | null>(null)
    currentUpdateGenreDto = this.updateGenreDto.asObservable();
    constructor(
        private http: HttpClient
    ) { }

    
    /**
     * Récupère 6 genres
     *
     */
    getSixgenre(){
        this.http.get<Genre[]>(this.urlSixForHome)
            .pipe()
            .toPromise()
            .then((r) =>{
                if(!r) return;
                this.genresSix.next(r);
            })
    }


    /**
     * Récupère les genre pour la pagination
     *
     */

    getGenres(page :number=0){
        this.http.get<Genres>(`${this.url}?page=${page}`, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe()
            .toPromise()
            .then((r)=>{
                if(!r) return;
                console.log(r)
                this.genrePagination.next(r);
            })
    }



    /**
     * Récupère un genre et ses manga associer.
     * @param id
     * @param page
     */
    getMangaGenre(id: number, page: number=0){
        this.http.get<DataGenre>(`${this.urlMangaInGenre}/${id}?page=${page}`, {
            headers: this.options.headers
        })
            .pipe()
            .toPromise()
            .then((r)=>{
                if(!r) return;
                console.log(r)
                this.dataGenre.next(r);
            })
    }

    addGenre(genreDto: Omit<GenreDto, "img"| "id" |"mangaId" >){
        firstValueFrom(this.http.post<GenreDto>(this.url,genreDto,{
            headers: this.options.headers
        }))
            .then((r)=>{
                if(!r) return;
                console.log(r)
                this.genreDto.next(r);
            })

    }


    getGenreDto(){
        firstValueFrom(this.http.get<GenreDto[]>(this.urlDto,{
            headers: this.options.headers
        }))        .then((r)=>{
            if(!r) return;
            this.genresDto.next(r);
        })
    }

    updateGenre(updateGenre: UpdateGenreDto):Observable<UpdateGenreDto> {
        return this.http.put<GenreDto>(`${this.urlDto}/${updateGenre.id}`,updateGenre)
    }

    removeGenre(id: number){
        firstValueFrom(this.http.delete<void>(`${this.url}/${id}`, {
                headers: this.options.headers
            })
        )    .then(() => {
            console.log(`Genre manga with ID ${id} has been deleted.`);

        })
            .catch((error) => {
                console.error('Error deleting genre:', error);
            });
    }

}