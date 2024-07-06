import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Genre} from '../types';


@Injectable({
    providedIn: 'root'
})

export class GenreService {
    url="http://localhost:8080/api/genres";
    urlSixForHome ="http://localhost:8080/api/genres/six"
    headers=new HttpHeaders()
        .set("content-type", "application/json")
        .set("Access-Control-Allow-Origin", '*');

    genres=new BehaviorSubject<Genre[]>([]);
    genre=new BehaviorSubject<Genre | null>(null);

    genresSix =   new BehaviorSubject<Genre[]>([]);
    currentGenresSix = this.genresSix.asObservable();

    currentGenres = this.genres.asObservable();
    currentGenre =this.genre.asObservable();



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


}