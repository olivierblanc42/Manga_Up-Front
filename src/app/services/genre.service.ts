import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import {Genre, Genres, DataGenre, Manga,GenreDto} from '../types';



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

    genreDto = new BehaviorSubject<GenreDto[]>([])
    currentGenreDto = this.genreDto.asObservable();


    // utilisation de la pagination
    genrePagination = new  BehaviorSubject<Genres | null>(null);
    currentGenrePagination = this.genrePagination.asObservable()
    //pagination manga dans genre
    dataGenre = new  BehaviorSubject<DataGenre | null>(null);
    currentDataGenre = this.dataGenre.asObservable()
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

    addGenre(genre: Omit<Genre, "id"|"img">){
        firstValueFrom(this.http.post<Genre>(this.url,genre,{
            headers: this.options.headers
        }))
            .then((r)=>{
               if(!r) return;
               console.log(r)
                this.genre.next(r);
    })

    }


    getGenreDto(){
        firstValueFrom(this.http.get<GenreDto[]>(this.urlDto,{
            headers: this.options.headers
        }))        .then((r)=>{
            if(!r) return;
            this.genreDto.next(r);
        })
    }



}