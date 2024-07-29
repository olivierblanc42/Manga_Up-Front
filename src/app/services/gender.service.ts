import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {DataManga, Gender, Genre} from "../types";

@Injectable({
    providedIn: 'root'
})

export class GenderService{
    url="http://localhost:8080/api/genders";

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
    gender = new BehaviorSubject<Gender | null>(null);

    genders = new BehaviorSubject<Gender[]>([]);
    currentGender = this.genders.asObservable()

    constructor(
        private http: HttpClient
    ) { }


    /**
     * Récupère les Genres des utilisateur
     *
     */
    getGenders(){
        this.http.get<Genre[]>(this.url)
            .pipe()
            .toPromise()
            .then((r) =>{
                if(!r) return;
                console.log(r)
                this.genders.next(r);
            })
    }



    getGender(id: number | null){
        this.http.get<Gender>(`${this.url}/${id}`,{headers: this.options.headers})
            .pipe()
            .toPromise()
            .then(r =>{
                if(!r ) return;
                console.log(r)
                this.gender.next(r);
            })
    }

}